import { pgTable, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"
import { creators } from "../creators"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tool-Creators ---
export const toolCreators = pgTable("tool_creators", {
	id: uuid("id").primaryKey().defaultRandom(),
	toolId: uuid("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	creatorId: uuid("creator_id")
		.notNull()
		.references(() => creators.id, { onDelete: "cascade" }),
})

// schema and types
export const insertToolCreatorSchema = createInsertSchema(toolCreators)
export const selectToolCreatorSchema = createSelectSchema(toolCreators)
export type InsertToolCreatorType = typeof toolCreators.$inferInsert
export type SelectToolCreatorType = typeof toolCreators.$inferSelect
