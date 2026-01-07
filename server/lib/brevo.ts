/**
 * Brevo (formerly Sendinblue) API Integration
 * Syncs leads to Brevo for email nurturing campaigns
 */

export interface BrevoContact {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  phone?: string;
  message?: string;
  providerCount?: number | string;
  segmentSlug?: string;
  sizeBucket?: string;
  persona?: string;
  formId?: string;
  leadSource?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

/**
 * Sync a contact to Brevo
 * Creates or updates the contact and adds them to the nurture list
 *
 * This function fails soft - logs errors but doesn't throw
 */
export async function syncToBrevo(contact: BrevoContact): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NURTURE_LIST_ID;

  if (!apiKey) {
    console.log('BREVO_API_KEY is not configured - skipping Brevo sync');
    return;
  }

  if (!listId) {
    console.log('BREVO_NURTURE_LIST_ID is not configured - skipping Brevo sync');
    return;
  }

  try {
    const safeString = (val?: string | null): string | undefined => val || undefined;
    const safeNumber = (val?: string | number | null): number | undefined => {
      if (val === undefined || val === null || val === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    };

    const attributes = {
      FIRSTNAME: safeString(contact.firstName),
      LASTNAME: safeString(contact.lastName),
      COMPANY: safeString(contact.company),
      JOB_TITLE: safeString(contact.role),
      PHONE: safeString(contact.phone),
      MESSAGE: safeString(contact.message),
      PROVIDER_COUNT: safeNumber(contact.providerCount),
      LEAD_SOURCE: safeString(contact.leadSource),

      LOGIC_SEGMENT: safeString(contact.segmentSlug),
      LOGIC_SIZE: safeString(contact.sizeBucket),
      LOGIC_PERSONA: safeString(contact.persona),
      LAST_FORM_ID: safeString(contact.formId),

      UTM_SOURCE: safeString(contact.utm_source),
      UTM_MEDIUM: safeString(contact.utm_medium),
      UTM_CAMPAIGN: safeString(contact.utm_campaign),
      UTM_CONTENT: safeString(contact.utm_content),
      UTM_TERM: safeString(contact.utm_term),
    };

    // Remove undefined keys
    const cleanAttributes = Object.fromEntries(
      Object.entries(attributes).filter(([_, v]) => v !== undefined)
    );

    console.log('Syncing to Brevo - Contact:', contact.email);

    const requestBody = {
      email: contact.email,
      updateEnabled: true,
      listIds: [parseInt(listId, 10)],
      attributes: cleanAttributes,
    };

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      console.log(`Successfully synced contact to Brevo: ${contact.email}`);
    } else {
      const errorText = await response.text();
      console.error(`Brevo API error (${response.status}):`, errorText);
    }
  } catch (error) {
    console.error('Error syncing contact to Brevo:', error);
  }
}
