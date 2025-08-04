import { generateId } from "@/lib/utils"
import { pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { creators } from "../creators"
import { tools } from "../tools"

// --- Tool-Creators ---
export const toolCreators = pgTable("tool_creators", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId("toolCreator")),
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	creatorId: text("creator_id")
		.notNull()
		.references(() => creators.id, { onDelete: "cascade" }),
})

// schema and types
export const insertToolCreatorSchema = createInsertSchema(toolCreators)
export const selectToolCreatorSchema = createSelectSchema(toolCreators)
export type InsertToolCreatorType = typeof toolCreators.$inferInsert
export type SelectToolCreatorType = typeof toolCreators.$inferSelect
