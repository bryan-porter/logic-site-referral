import { randomUUID } from "crypto";

import { query } from "../../server/lib/db";
import { syncToBrevo } from "../../server/lib/brevo";

// ========================================
// Helpers
// ========================================

function sanitizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, "").trim();
  if (cleaned.length < 7) return undefined;
  return cleaned;
}

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

function verifyPublicApiKey(req: any): boolean {
  const serverKey = process.env.PUBLIC_API_KEY;
  if (!serverKey) return true;
  const clientKey = req.headers["x-public-api-key"];
  if (!clientKey) return false;
  const headerValue = Array.isArray(clientKey) ? clientKey[0] : clientKey;
  return headerValue === serverKey;
}

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method Not Allowed" });
    return;
  }

  if (!verifyPublicApiKey(req)) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return;
  }

  const requestId = randomUUID();

  let body: Record<string, any> = {};
  try {
    if (typeof req.body === "string") {
      body = JSON.parse(req.body);
    } else if (typeof req.body === "object" && req.body !== null) {
      body = req.body as Record<string, any>;
    } else {
      body = {};
    }
  } catch {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }

  if (body.website && String(body.website).trim() !== "") {
    res.json({ ok: true });
    return;
  }

  const email = body.email ? String(body.email).trim() : "";
  if (!email) {
    res.status(400).json({ ok: false, error: "email is required" });
    return;
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
    console.error(`[lead:${requestId}] db error`, dbError);
    res.status(500).json({
      ok: false,
      dbSaved: false,
      hubspot: "skipped",
      brevo: "skipped",
      message: "Database error",
    });
    return;
  }

  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!hubspotToken) {
    console.error(`[lead:${requestId}] HUBSPOT_ACCESS_TOKEN missing`);
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
          `[lead:${requestId}] hubspot error`,
          createResponse.status
        );
        hubspotStatus = "error";
      }
    } catch (hubspotError) {
      console.error(`[lead:${requestId}] hubspot exception`, hubspotError);
      hubspotStatus = "error";
    }
  }

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
    console.error(`[lead:${requestId}] brevo exception`, brevoError);
    brevoStatus = "error";
  }

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
      console.error(`[lead:${requestId}] identity upsert error`, dbError);
    }
  }

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
    console.error(`[lead:${requestId}] event log error`, dbError);
  }

  if (hubspotStatus === "error" || brevoStatus === "error") {
    res.status(207).json({
      ok: false,
      dbSaved,
      hubspot: hubspotStatus,
      brevo: brevoStatus,
      message: "Partial success",
    });
    return;
  }

  console.log(`[lead:${requestId}] ok`, {
    dbSaved,
    hubspot: hubspotStatus,
    brevo: brevoStatus,
  });

  res.json({ ok: true, dbSaved, hubspot: hubspotStatus, brevo: brevoStatus });
}
