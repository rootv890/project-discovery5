import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { tools } from './tables/tools';
import { platforms } from './tables/platforms';

// --- Tool-Platforms ---

export const toolPlatforms = pgTable('tool_platforms', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  platformId: uuid('platform_id')
    .notNull()
    .references(() => platforms.id, { onDelete: 'cascade' }),
});
