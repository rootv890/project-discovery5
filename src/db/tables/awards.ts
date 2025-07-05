import { generateId } from "@/lib/utils"
import { jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const awards = pgTable("awards", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateId("award")),
	title: text("title").notNull(),
	imageUrl: text("image_url").notNull().default("www.google.com/logo"),
	slug: text("slug"),
	by: text("by").default("unknown"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// types and schemas
export const createAwardSchema = createInsertSchema(awards)
export const selectAwardSchema = createSelectSchema(awards)
export type CreateAwardSchema = typeof awards.$inferInsert
export type SelectAwardSchema = typeof awards.$inferSelect
