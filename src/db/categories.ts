import {
  pgTable,
  uuid,
  text,
  jsonb,
} from 'drizzle-orm/pg-core';


// --- Categories ---

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});
