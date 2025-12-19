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
