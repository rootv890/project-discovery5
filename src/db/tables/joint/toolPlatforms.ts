import { generateId } from "@/lib/utils"
import { index, pgTable, text, unique, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { platforms } from "../platforms"
import { tools } from "../tools"

// --- Tool-Platforms ---

export const toolPlatforms = pgTable(
	"tool_platforms",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => generateId("toolPlatform")),
		toolId: text("tool_id")
			.notNull()
			.references(() => tools.id, { onDelete: "cascade" }),
		platformId: text("platform_id")
			.notNull()
			.references(() => platforms.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("tool_platforms_index").on(table.toolId, table.platformId),
		// to avoid duplicate tool-platforms
		unique("tool_platforms_unique").on(table.toolId, table.platformId),
	]
)

// schema and types
export const insertToolPlatformSchema = createInsertSchema(toolPlatforms)
export const selectToolPlatformSchema = createSelectSchema(toolPlatforms)
export type InsertToolPlatformType = typeof toolPlatforms.$inferInsert
export type SelectToolPlatformType = typeof toolPlatforms.$inferSelect
