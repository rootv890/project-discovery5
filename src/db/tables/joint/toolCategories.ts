import {
	index,
	pgTable,
	primaryKey,
	text,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { tools } from "../tools"
import { categories } from "../categories"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tool-Categories ---
export const toolCategories = pgTable(
	"tool_categories",
	{
		id: text("id").primaryKey(),
		toolId: text("tool_id")
			.notNull()
			.references(() => tools.id, { onDelete: "cascade" }),
		categoryId: text("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("tool_categories_index").on(table.toolId, table.categoryId),
		// to avoid duplicate same tool with samecategory
		unique("tool_categories_unique").on(table.toolId, table.categoryId),
	]
)

// schema and types
export const insertToolCategorySchema = createInsertSchema(toolCategories)
export const selectToolCategorySchema = createSelectSchema(toolCategories)
export type InsertToolCategoryType = typeof toolCategories.$inferInsert
export type SelectToolCategoryType = typeof toolCategories.$inferSelect
