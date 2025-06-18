import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


 export const comments = pgTable('comments', {
   id: uuid('id').primaryKey().defaultRandom(),
   userId: uuid('user_id').notNull(),
   content: text('content').notNull(),
   parentId: uuid('parent_id').references(() => comments.id, { onDelete: 'set null' }),
   targetType: text('target_type').notNull(), // e.g., "Tool", "Resource"
   targetId: uuid('target_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
     updatedAt: timestamp('updated_at').notNull().defaultNow(),
 });