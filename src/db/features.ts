import { pgTable, text, uuid } from "drizzle-orm/pg-core";

// --- Features (offer T14X) ---

export const features = pgTable('features', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});