-- Visitor identity tracking table
-- Tracks anonymous visitors and links them to CRM contacts once identified
CREATE TABLE IF NOT EXISTS visitor_identities (
    id BIGSERIAL PRIMARY KEY,
    anonymous_id UUID NOT NULL,
    crm_contact_id TEXT,
    email TEXT,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    identified_at TIMESTAMPTZ
);

-- Create unique constraint for anonymous_id to support upserts
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitor_identities_anonymous_id_unique
ON visitor_identities (anonymous_id);

-- Additional indexes for lookups
CREATE INDEX IF NOT EXISTS idx_visitor_identities_anonymous_id
ON visitor_identities (anonymous_id);

CREATE INDEX IF NOT EXISTS idx_visitor_identities_crm_contact_id
ON visitor_identities (crm_contact_id);

-- Events table for tracking form submissions and other events
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    anonymous_id UUID NOT NULL,
    user_id TEXT,
    event_name TEXT NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT NOT NULL,
    path TEXT,
    url TEXT,
    properties JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Indexes for events table
CREATE INDEX IF NOT EXISTS idx_events_anonymous_id
ON events (anonymous_id);

CREATE INDEX IF NOT EXISTS idx_events_user_id
ON events (user_id);

CREATE INDEX IF NOT EXISTS idx_events_occurred_at_desc
ON events (occurred_at DESC);
