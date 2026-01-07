import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { randomUUID } from "crypto";
import { query } from "./lib/db";
import { syncToBrevo } from "./lib/brevo";
import multer from "multer";

// Multer setup for form data parsing
const upload = multer({ storage: multer.memoryStorage() });

// ========================================
// Phone Sanitization Helper
// ========================================
function sanitizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, '').trim();
  if (cleaned.length < 7) return undefined;
  return cleaned;
}

// ========================================
// Segmentation Helpers
// ========================================

function getCompanySizeBucket(count: string | number | undefined): string | undefined {
  if (!count) return undefined;
  const num = typeof count === "string" ? parseInt(count, 10) : count;
  if (isNaN(num)) return undefined;
  if (num <= 5) return "small";
  if (num <= 25) return "mid";
  return "large";
}

function getPersonaTag(role: string | undefined): string | undefined {
  if (!role) return undefined;
  const normalized = role.toLowerCase();

  if (
    normalized.includes("finance") ||
    normalized.includes("cfo") ||
    normalized.includes("revenue")
  ) {
    return "finance";
  }

  if (
    normalized.includes("ops") ||
    normalized.includes("operation") ||
    normalized.includes("practice") ||
    normalized.includes("manager") ||
    normalized.includes("admin")
  ) {
    return "operations";
  }

  if (
    normalized.includes("clinical") ||
    normalized.includes("md") ||
    normalized.includes("do") ||
    normalized.includes("doctor") ||
    normalized.includes("nurse") ||
    normalized.includes("provider")
  ) {
    return "clinical";
  }

  return undefined;
}

// ========================================
// Public API Key Auth (optional)
// ========================================

function verifyPublicApiKey(req: Request): boolean {
  const serverKey = process.env.PUBLIC_API_KEY;
  if (!serverKey) return true;
  const clientKey = req.get("x-public-api-key");
  return Boolean(clientKey && clientKey === serverKey);
}

// ========================================
// Rate Limiting
// ========================================
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ========================================
  // Lead Form Endpoint (Referral Applications)
  // POST /api/forms/lead
  // ========================================
  app.post("/api/forms/lead", async (req: Request, res: Response) => {
    if (!verifyPublicApiKey(req)) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      (req.headers["x-real-ip"] as string) ||
      req.ip ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        ok: false,
        error: "Too many requests. Please try again later.",
      });
    }

    const body = req.body || {};

    // Honeypot check
    if (body.website && String(body.website).trim() !== "") {
      return res.json({ ok: true });
    }

    const email = body.email ? String(body.email).trim() : "";
    if (!email) {
      return res.status(400).json({ ok: false, error: "email is required" });
    }

    const name = body.name ? String(body.name).trim() : "";
    const role = body.role ? String(body.role).trim() : undefined;
    const organization = body.organization ? String(body.organization).trim() : undefined;
    const providerCount = body.provider_count ?? undefined;
    const visitorId = body.visitor_id || randomUUID();
    const safePhone = sanitizePhone(body.phone);
    const companySizeBucket = getCompanySizeBucket(providerCount);
    const personaTag = getPersonaTag(role);

    let dbSaved = false;
    let hubspotStatus: "ok" | "error" | "skipped" = "skipped";
    let brevoStatus: "ok" | "error" | "skipped" = "skipped";

    // ========================================
    // Neon Write (source of record)
    // ========================================
    try {
      const eventProperties = {
        name,
        email,
        phone: safePhone,
        role,
        organization,
        provider_count: providerCount,
        form_id: body.form_id,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_content: body.utm_content,
        utm_term: body.utm_term,
        segment_slug: body.segment_slug,
        company_size_bucket: companySizeBucket,
        persona: personaTag,
        message: body.message,
        referrer: body.referrer,
      };

      const eventQuery = `
        INSERT INTO events (
          anonymous_id,
          user_id,
          event_name,
          occurred_at,
          source,
          properties
        )
        VALUES ($1, $2, $3, NOW(), $4, $5)
      `;

      await query(eventQuery, [
        visitorId,
        null,
        "form_received",
        "web",
        JSON.stringify(eventProperties),
      ]);

      dbSaved = true;
    } catch (dbError) {
      console.error("Error logging lead event:", dbError);
      return res.status(500).json({
        ok: false,
        dbSaved: false,
        hubspot: "skipped",
        brevo: "skipped",
        message: "Database error",
      });
    }

    // ========================================
    // HubSpot Integration (Upsert Logic)
    // ========================================
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!hubspotToken) {
      console.error("HUBSPOT_ACCESS_TOKEN is not configured");
      hubspotStatus = "error";
    }

    let crmContactId: string | null = null;
    const firstname = name ? name.split(" ")[0] : undefined;

    if (hubspotToken) {
      const contactProperties = {
        properties: {
          email,
          ...(firstname ? { firstname } : {}),
          ...(safePhone ? { phone: safePhone } : {}),
          ...(role ? { jobtitle: role } : {}),
          ...(organization ? { company: organization } : {}),
          ...(providerCount ? { provider_count: String(providerCount) } : {}),
          ...(body.utm_source ? { utm_source: String(body.utm_source) } : {}),
          ...(body.utm_medium ? { utm_medium: String(body.utm_medium) } : {}),
          ...(body.utm_campaign ? { utm_campaign: String(body.utm_campaign) } : {}),
          ...(body.utm_content ? { utm_content: String(body.utm_content) } : {}),
          ...(body.utm_term ? { utm_term: String(body.utm_term) } : {}),
          ...(body.form_id ? { last_form_id: String(body.form_id) } : {}),
          lead_source: "Website form",
          ...(body.segment_slug ? { logic_segment_slug: String(body.segment_slug) } : {}),
          ...(companySizeBucket ? { logic_company_size_bucket: companySizeBucket } : {}),
          ...(personaTag ? { logic_persona: personaTag } : {}),
        },
      };

      try {
        const createResponse = await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${hubspotToken}`,
            },
            body: JSON.stringify(contactProperties),
          }
        );

        if (createResponse.ok) {
          const data = await createResponse.json();
          crmContactId = data.id;
          hubspotStatus = "ok";
        } else if (createResponse.status === 409) {
          const errorData = await createResponse.json();
          if (errorData.message?.includes("Contact already exists")) {
            const existingId = errorData.existingObjectId;
            if (existingId) {
              crmContactId = existingId;
            } else {
              const lookupResponse = await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(
                  email
                )}?idProperty=email`,
                { headers: { Authorization: `Bearer ${hubspotToken}` } }
              );

              if (lookupResponse.ok) {
                const lookupData = await lookupResponse.json();
                crmContactId = lookupData.id;
              }
            }

            if (crmContactId) {
              await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${crmContactId}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${hubspotToken}`,
                  },
                  body: JSON.stringify(contactProperties),
                }
              );
              hubspotStatus = "ok";
            } else {
              hubspotStatus = "error";
            }
          } else {
            hubspotStatus = "error";
          }
        } else {
          console.error(
            "HubSpot API error:",
            createResponse.status,
            await createResponse.text()
          );
          hubspotStatus = "error";
        }
      } catch (hubspotError) {
        console.error("Error communicating with HubSpot:", hubspotError);
        hubspotStatus = "error";
      }
    }

    // ========================================
    // Brevo Integration (Email Nurturing)
    // ========================================
    const nameParts = name ? name.split(" ") : [];
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.slice(1).join(" ") || undefined;

    try {
      await syncToBrevo({
        email,
        firstName,
        lastName,
        phone: safePhone,
        company: organization,
        role,
        providerCount,
        leadSource: "Website form",
        segmentSlug: body.segment_slug || undefined,
        sizeBucket: companySizeBucket || undefined,
        persona: personaTag || undefined,
        formId: body.form_id,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_content: body.utm_content,
        utm_term: body.utm_term,
        message: body.message,
      });
      brevoStatus = "ok";
    } catch (brevoError) {
      console.error("Error syncing to Brevo:", brevoError);
      brevoStatus = "error";
    }

    // ========================================
    // Visitor Identity Link (Database)
    // ========================================
    if (crmContactId) {
      try {
        const upsertQuery = `
          INSERT INTO visitor_identities (anonymous_id, crm_contact_id, email, identified_at, first_seen_at)
          VALUES ($1, $2, $3, NOW(), NOW())
          ON CONFLICT (anonymous_id)
          DO UPDATE SET
            crm_contact_id = $2,
            email = COALESCE(visitor_identities.email, $3),
            identified_at = COALESCE(visitor_identities.identified_at, NOW())
        `;
        await query(upsertQuery, [visitorId, crmContactId, email]);
      } catch (dbError) {
        console.error("Error linking visitor identity:", dbError);
      }
    }

    // ========================================
    // Event Log (Database)
    // ========================================
    try {
      const eventProperties = {
        name,
        email,
        phone: safePhone,
        role,
        organization,
        provider_count: providerCount,
        form_id: body.form_id,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_content: body.utm_content,
        utm_term: body.utm_term,
        segment_slug: body.segment_slug,
        company_size_bucket: companySizeBucket,
        persona: personaTag,
        message: body.message,
        referrer: body.referrer,
      };

      const eventQuery = `
        INSERT INTO events (
          anonymous_id,
          user_id,
          event_name,
          occurred_at,
          source,
          properties
        )
        VALUES ($1, $2, $3, NOW(), $4, $5)
      `;

      await query(eventQuery, [
        visitorId,
        crmContactId,
        "form_submitted",
        "web",
        JSON.stringify(eventProperties),
      ]);
    } catch (dbError) {
      console.error("Error logging event:", dbError);
    }

    if (hubspotStatus === "error" || brevoStatus === "error") {
      return res.status(207).json({
        ok: false,
        dbSaved,
        hubspot: hubspotStatus,
        brevo: brevoStatus,
        message: "Partial success",
      });
    }

    return res.json({ ok: true, dbSaved, hubspot: hubspotStatus, brevo: brevoStatus });
  });

  // ========================================
  // Careers Form Endpoint
  // POST /api/forms/careers
  // ========================================
  app.post('/api/forms/careers', upload.single('resume'), async (req: Request, res: Response) => {
    // Rate limiting
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] as string ||
      req.ip ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many requests. Please try again later.',
      });
    }

    // Check HubSpot access token
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!hubspotToken) {
      console.error('HUBSPOT_ACCESS_TOKEN is not configured');
      return res.status(500).json({
        ok: false,
        error: 'Server configuration error',
      });
    }

    // Extract form fields from body
    const {
      fullName,
      email,
      phone: rawPhone,
      linkedinUrl,
      currentRole,
      relevantExperience,
      roleSlug,
      roleName,
      source,
      visitor_id,
      // UTM and attribution fields
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referrer,
    } = req.body;

    const safePhone = sanitizePhone(rawPhone);
    const finalVisitorId = visitor_id || randomUUID();

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        ok: false,
        error: 'Name and email are required',
      });
    }

    console.log('Processing careers application:', {
      email,
      fullName,
      roleSlug,
    });

    // ========================================
    // HubSpot Contact Creation/Update
    // ========================================
    let crmContactId: string | null = null;

    const nameParts = fullName.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    const applicationSummary = [
      linkedinUrl && `LinkedIn: ${linkedinUrl}`,
      currentRole && `Current Role: ${currentRole}`,
      relevantExperience && `Relevant Experience: ${relevantExperience}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const contactProperties = {
      properties: {
        email,
        firstname,
        lastname,
        ...(safePhone ? { phone: safePhone } : {}),
        ...(applicationSummary ? { message: applicationSummary } : {}),
        ...(linkedinUrl ? { linkedin_url: linkedinUrl } : {}),
        lifecyclestage: 'other',
        applicant_status: 'New',
        lead_source: source || 'Referral Partner Application',
      },
    };

    try {
      // Attempt to CREATE contact
      const createResponse = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hubspotToken}`,
          },
          body: JSON.stringify(contactProperties),
        }
      );

      if (createResponse.ok) {
        const data = await createResponse.json();
        crmContactId = data.id;
        console.log(`Created new HubSpot contact: ${crmContactId}`);
      } else if (createResponse.status === 409) {
        // Contact already exists
        const errorData = await createResponse.json();

        if (errorData.message?.includes('Contact already exists')) {
          const existingId = errorData.existingObjectId;

          if (existingId) {
            crmContactId = existingId;
          } else {
            // Fallback: Look up contact by email
            const lookupResponse = await fetch(
              `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
              {
                headers: { Authorization: `Bearer ${hubspotToken}` },
              }
            );

            if (lookupResponse.ok) {
              const lookupData = await lookupResponse.json();
              crmContactId = lookupData.id;
            }
          }

          // Update the existing contact
          if (crmContactId) {
            await fetch(
              `https://api.hubapi.com/crm/v3/objects/contacts/${crmContactId}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${hubspotToken}`,
                },
                body: JSON.stringify(contactProperties),
              }
            );
            console.log(`Updated existing HubSpot contact: ${crmContactId}`);
          }
        }
      } else {
        console.error(
          'HubSpot API error:',
          createResponse.status,
          await createResponse.text()
        );
      }
    } catch (hubspotError) {
      console.error('Error communicating with HubSpot:', hubspotError);
    }

    // ========================================
    // Brevo Integration
    // ========================================
    await syncToBrevo({
      email,
      firstName: firstname,
      lastName: lastname,
      phone: safePhone,
      role: roleName || 'Referral Partner',
      message: applicationSummary,
      leadSource: 'Referral Partner Application',
    });

    // ========================================
    // Visitor Identity Link (Database)
    // ========================================
    if (crmContactId) {
      try {
        const upsertQuery = `
          INSERT INTO visitor_identities (anonymous_id, crm_contact_id, email, identified_at, first_seen_at)
          VALUES ($1, $2, $3, NOW(), NOW())
          ON CONFLICT (anonymous_id)
          DO UPDATE SET
            crm_contact_id = $2,
            email = COALESCE(visitor_identities.email, $3),
            identified_at = COALESCE(visitor_identities.identified_at, NOW())
        `;
        await query(upsertQuery, [finalVisitorId, crmContactId, email]);
        console.log(`Linked visitor ${finalVisitorId} to CRM contact ${crmContactId}`);
      } catch (dbError) {
        console.error('Error linking visitor identity:', dbError);
      }
    }

    // ========================================
    // Event Log (Database)
    // ========================================
    try {
      const eventProperties = {
        fullName,
        email,
        phone: safePhone,
        roleSlug,
        roleName,
        source,
        linkedinUrl,
        currentRole,
        relevantExperience,
        // UTM and attribution data
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        referrer,
      };

      const eventQuery = `
        INSERT INTO events (
          anonymous_id,
          user_id,
          event_name,
          occurred_at,
          source,
          properties
        )
        VALUES ($1, $2, $3, NOW(), $4, $5)
      `;

      await query(eventQuery, [
        finalVisitorId,
        crmContactId,
        'application_submitted',
        'web',
        JSON.stringify(eventProperties),
      ]);
      console.log('Logged application_submitted event');
    } catch (dbError) {
      console.error('Error logging event:', dbError);
    }

    // ========================================
    // Success Response
    // ========================================
    return res.json({ ok: true });
  });

  return httpServer;
}
