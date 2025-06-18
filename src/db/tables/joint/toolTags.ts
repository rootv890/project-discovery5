import { pgTable, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"
import { tags } from "../tags"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tool-Tags ---

export const toolTags = pgTable("tool_tags", {
	id: uuid("id").primaryKey().defaultRandom(),
	toolId: uuid("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	tagId: uuid("tag_id")
		.notNull()
		.references(() => tags.id, { onDelete: "cascade" }),
})

// schema and types
export const insertToolTagSchema = createInsertSchema(toolTags)
export const selectToolTagSchema = createSelectSchema(toolTags)
export type InsertToolTagType = typeof toolTags.$inferInsert
export type SelectToolTagType = typeof toolTags.$inferSelect
