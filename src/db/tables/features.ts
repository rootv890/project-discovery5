import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { tools } from "./tools"

export const features = pgTable("features", {
	id: text("id").primaryKey(),
	json: jsonb("json"), // todo : generate a json schema for this
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// schema and types
export const insertFeatureSchema = createInsertSchema(features)
export const selectFeatureSchema = createSelectSchema(features)
export type InsertFeatureType = typeof features.$inferInsert
export type SelectFeatureType = typeof features.$inferSelect
