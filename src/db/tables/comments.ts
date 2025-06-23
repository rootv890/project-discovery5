import {
	AnyPgColumn,
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { user } from "../auth-schema"

export const commentTargetTypes = pgEnum("target_type", ["Tool", "Resource"])

export const comments = pgTable(
	"comments",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.references(() => user.id, {
				onDelete: "set default",
			})
			.notNull(),
		content: text("content").notNull(),
		targetType: commentTargetTypes("target_type").notNull(),
		targetId: text("target_id").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
		// fix to self-referencing table
		parentId: text("parent_id").references((): AnyPgColumn => comments.id, {
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
