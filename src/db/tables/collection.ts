// this table is for personal collection of user of tools he/she needs
// a user can have multiple collections to manage

import { generateId } from "@/lib/utils"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const collections = pgTable("collections", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId("collection")),
	name: text("name").notNull(),
	iconUrl: text("icon_url").default(
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1pY29uIGx1Y2lkZS1mb2xkZXIiPjxwYXRoIGQ9Ik0yMCAyMGEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtNy45YTIgMiAwIDAgMS0xLjY5LS45TDkuNiAzLjlBMiAyIDAgMCAwIDcuOTMgM0g0YTIgMiAwIDAgMC0yIDJ2MTNhMiAyIDAgMCAwIDIgMloiLz48L3N2Zz4="
	),
	description: text("description").default(""),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
})

export const insertCollectionSchema = createInsertSchema(collections)
export const selectCollectionSchema = createSelectSchema(collections)
export type InsertCollectionType = typeof collections.$inferInsert
export type SelectCollectionType = typeof collections.$inferSelect
