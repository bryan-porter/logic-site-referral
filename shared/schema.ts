import { sql } from "drizzle-orm";
import { pgTable, text, varchar, bigserial, uuid, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Visitor identity tracking table
export const visitorIdentities = pgTable("visitor_identities", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  anonymousId: uuid("anonymous_id").notNull(),
  crmContactId: text("crm_contact_id"),
  email: text("email"),
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true }).notNull().defaultNow(),
  identifiedAt: timestamp("identified_at", { withTimezone: true }),
}, (table) => [
  index("idx_visitor_identities_anonymous_id").on(table.anonymousId),
  index("idx_visitor_identities_crm_contact_id").on(table.crmContactId),
]);

// Events table for tracking form submissions and other events
export const events = pgTable("events", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  anonymousId: uuid("anonymous_id").notNull(),
  userId: text("user_id"),
  eventName: text("event_name").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
  source: text("source").notNull(),
  path: text("path"),
  url: text("url"),
  properties: jsonb("properties").notNull().default({}),
}, (table) => [
  index("idx_events_anonymous_id").on(table.anonymousId),
  index("idx_events_user_id").on(table.userId),
  index("idx_events_occurred_at_desc").on(table.occurredAt),
]);
