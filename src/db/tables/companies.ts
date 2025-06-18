import { pgTable, text, uuid } from "drizzle-orm/pg-core";

// --- Companies ( offerT14X) ---

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  website: text('website'),
});