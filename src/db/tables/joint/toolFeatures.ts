import { pgTable, uuid } from "drizzle-orm/pg-core";
import { tools } from "../tools";
import { features } from "../features";

// --- Tool-Features ---

export const toolFeatures = pgTable('tool_features', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  featureId: uuid('feature_id')
    .notNull()
    .references(() => features.id, { onDelete: 'cascade' }),
});