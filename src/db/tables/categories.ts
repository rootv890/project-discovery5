import { generateId } from "@/lib/utils"
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Categories ---

export const categories = pgTable("categories", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId("category")),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	imageUrl: text("image_url"),
	iconSvg: text("icon_svg"),
	description: text("description"),
	json: jsonb("json"), // todo : generate a json schema for this
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// schema and types
export const insertCategorySchema = createInsertSchema(categories)
export const selectCategorySchema = createSelectSchema(categories)
export type InsertCategoryType = typeof categories.$inferInsert
export type SelectCategoryType = typeof categories.$inferSelect

// joins with  - tools, platforms, tags, companies,
