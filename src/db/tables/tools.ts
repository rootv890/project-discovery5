import {
  pgTable,
  uuid,
  text,
  jsonb,
} from 'drizzle-orm/pg-core';

// --- Tools ---

export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});