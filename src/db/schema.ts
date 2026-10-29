import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Newsletter signups captured by the prototype. No email is sent – records are
// simply stored so the owner can export them or connect a mailing provider.
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Contact form submissions. Stored in the database only – no email delivery is
// wired up in this prototype.
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
