import { generateId } from "@/lib/utils"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { tags } from "../tags"
import { tools } from "../tools"

// --- Tool-Tags ---

export const toolTags = pgTable("tool_tags", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId("toolTag")),
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	tagId: text("tag_id")
		.notNull()
		.references(() => tags.id, { onDelete: "cascade" }),
})

// schema and types
export const insertToolTagSchema = createInsertSchema(toolTags)
export const selectToolTagSchema = createSelectSchema(toolTags)
export type InsertToolTagType = typeof toolTags.$inferInsert
export type SelectToolTagType = typeof toolTags.$inferSelect
