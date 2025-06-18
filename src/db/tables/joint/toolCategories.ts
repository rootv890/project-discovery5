import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { tools } from '../tools'; 
import { categories } from '../categories'; 

// --- Tool-Categories ---

export const toolCategories = pgTable('tool_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});
