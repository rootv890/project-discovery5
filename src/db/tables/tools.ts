import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tools ---
export const tools = pgTable("tools", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	imageUrl: text("image_url"),
	description: text("description"),
	json: jsonb("json"), // todo : generate a json schema for this
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// schema and types
export const insertToolSchema = createInsertSchema(tools)
export const selectToolSchema = createSelectSchema(tools)
export type InsertToolType = typeof tools.$inferInsert
export type SelectToolType = typeof tools.$inferSelect

// joins with  - categories, platforms, tags, companies
