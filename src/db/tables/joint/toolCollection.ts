import { user } from "@/db/auth-schema"
import { generateId } from "@/lib/utils"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { collections } from "../collection"
import { tools } from "../tools"

export const toolCollection = pgTable("tool_collection", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId("toolCollection")),
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, {
			onDelete: "cascade",
		}),
	collectionId: text("collection_id")
		.notNull()
		.references(() => collections.id, {
			onDelete: "cascade",
		}),
	userId: text("user_id").references(() => user.id, {
		onDelete: "cascade",
	}),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
})

export const insertToolCollectionSchema = createInsertSchema(toolCollection)
export const selectToolCollectionSchema = createSelectSchema(toolCollection)

export type InsertToolCollectionType = typeof toolCollection.$inferInsert
export type SelectToolCollectionType = typeof toolCollection.$inferSelect
