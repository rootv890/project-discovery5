
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

// --- Platforms ---


export const platforms = pgTable('platforms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});