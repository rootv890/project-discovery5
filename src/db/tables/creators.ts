import {
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Creators ---

export const creators = pgTable("creators", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	imageUrl: text("image_url"),
	description: text("description"),
	url: text("url"), // official website url
	json: jsonb("json"), // todo : generate a json schema for
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

/**
 * json schema idea
 * 1.  web url
 * 2.  social media urls - twitter, linkedin, github, etc.
 * 3. email addresses
 */

// schema and types
export const insertCreatorSchema = createInsertSchema(creators)
export const selectCreatorSchema = createSelectSchema(creators)
export type InsertCreatorType = typeof creators.$inferInsert
export type SelectCreatorType = typeof creators.$inferSelect

// joins with  - tools, categories, platforms, tags
