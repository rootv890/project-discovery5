import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// --- Companies ( offerT14X) ---

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  website: text('website'),
   createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});