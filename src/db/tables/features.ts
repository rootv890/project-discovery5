import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// --- Features (offer T14X) ---

export const features = pgTable('features', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
   createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});