import { jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tools ---

export const toolStatus = pgEnum("tool_status", [
	"draft",
	"pending_review",
	"approved",
	"rejected",
])

export const pricingEnum = pgEnum("pricing_enum", [
	"free",
	"free open source",
	"paid",
	"freemium",
	"subscription",
	"one-time",
])

export const tools = pgTable("tools", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	subtitle: text("subtitle").notNull(),
	slug: text("slug").notNull(),
	imageUrl: text("image_url"),
	description: text("description"),
	pricing: pricingEnum("pricing_enum").notNull().default("free"),
	status: toolStatus("tool_status").default("draft"),
	json: jsonb("json"), // todo : generate a json schema for this
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// schema and types
export const insertToolSchema = createInsertSchema(tools)
export const selectToolSchema = createSelectSchema(tools)
export type InsertToolType = typeof tools.$inferInsert
export type SelectToolType = typeof tools.$inferSelect
