import { sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
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

/**
 * Cópia local de cada lead capturado no pop-up de checkout. Serve como rede de
 * segurança: se o envio ao Active Campaign falhar, o contato não se perde.
 */
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  countryCode: text("country_code").notNull(),
  phone: text("phone").notNull(),
  plan: text("plan").notNull(),
  billing: text("billing").notNull(),
  tag: text("tag").notNull(),
  utm: jsonb("utm"),
  pageUrl: text("page_url"),
  crmSynced: text("crm_synced").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type InsertLead = typeof leads.$inferInsert;
export type LeadRecord = typeof leads.$inferSelect;
