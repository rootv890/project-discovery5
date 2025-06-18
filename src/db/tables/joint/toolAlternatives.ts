import { pgTable, uuid } from "drizzle-orm/pg-core";
import { tools } from "../tools";


// --- Tool-Alternatives ---


export const toolAlternatives = pgTable('tool_alternatives', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  alternativeToolId: uuid('alternative_tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
});