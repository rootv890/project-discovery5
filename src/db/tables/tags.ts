import { generateId } from "@/lib/utils"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tags ---
export const tags = pgTable("tags", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateId("tag")),
	name: text("name").notNull(),
	color: text("color").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	usageCount: integer("usage_count").notNull().default(0), // to sort tags by usage
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// schema and types
export const insertTagSchema = createInsertSchema(tags)
export const selectTagSchema = createSelectSchema(tags)
export type InsertTagType = typeof tags.$inferInsert
export type SelectTagType = typeof tags.$inferSelect
