# logic-site-referral

## Environment
- Set required env vars in your hosting provider (e.g., Vercel Project Settings → Environment Variables).
- Use `.env.example` for the list of required variable names.

## Form API test (example)
```bash
curl -X POST https://ccm-logichm.com/api/forms/lead \
  -H "Content-Type: application/json" \
  -H "x-public-api-key: <PUBLIC_API_KEY_IF_SET>" \
  -d '{"email":"jane@example.com","visitor_id":"<uuid>","form_id":"referral-partner-application"}'
```
