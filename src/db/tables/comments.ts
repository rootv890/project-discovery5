import { generateId } from "@/lib/utils"
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
import { tools } from "./tools"

export const commentTargetTypes = pgEnum("target_type", ["Tool", "Resource"])

export const comments = pgTable(
	"comments",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId("comment")),

		userId: text("user_id")
			.references(() => user.id, {
				onDelete: "set default",
			})
			.notNull(),

		content: text("content").notNull(),

		toolId: text("tool_id").references(() => tools.id, {
			onDelete: "cascade",
		}),

		parentId: text("parent_id").references((): AnyPgColumn => comments.id, {
			onDelete: "set null",
		}),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		index("comment_target_idx").on(table.toolId, table.userId),
		index("comment_parent_idx").on(table.parentId),
		index("comment_user_idx").on(table.userId),
	]
)

// schema and types
export const insertCommentSchema = createInsertSchema(comments)
export const selectCommentSchema = createSelectSchema(comments)
export type InsertCommentType = typeof comments.$inferInsert
export type SelectCommentType = typeof comments.$inferSelect
