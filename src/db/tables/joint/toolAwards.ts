import { jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { awards } from "../awards"
import { tools } from "../tools"

// --- Tool Awards ---
export const toolAwards = pgTable("tool_awards", {
	id: text("id").primaryKey(),
	toolId: text("tool_id")
		.references(() => tools.id)
		.notNull(),
	awardId: text("award_id")
		.references(() => awards.id)
		.notNull(),
	awardYear: text("award_year").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
