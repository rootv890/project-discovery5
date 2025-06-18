import {
	AnyPgColumn,
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const targetTypes = pgEnum("target_type", ["Tool", "Resource"])

export const comments = pgTable(
	"comments",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id").notNull(),
		content: text("content").notNull(),
		targetType: targetTypes("target_type").notNull(),
		targetId: uuid("target_id").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
		// fix to self-referencing table
		parentId: uuid("parent_id").references((): AnyPgColumn => comments.id, {
			onDelete: "set null",
		}),
	},
	// indexes
	(table) => [
		index("comment_target_idx").on(table.targetId),
		index("comment_parent_idx").on(table.parentId),
		index("comment_user_idx").on(table.userId),
	]
)

// schema and types
export const insertCommentSchema = createInsertSchema(comments)
export const selectCommentSchema = createSelectSchema(comments)
export type InsertCommentType = typeof comments.$inferInsert
export type SelectCommentType = typeof comments.$inferSelect
