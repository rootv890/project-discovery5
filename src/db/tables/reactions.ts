import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tools } from "./tools";

// --- Reactions ---
export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  reactType: text('react_type').notNull(), // e.g., "like", "love", etc.
   createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});