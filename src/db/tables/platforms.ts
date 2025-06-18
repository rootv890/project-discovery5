
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// --- Platforms ---


export const platforms = pgTable('platforms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
   createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});