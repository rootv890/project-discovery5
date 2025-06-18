import { index, pgTable, unique, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"
import { platforms } from "../platforms"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Tool-Platforms ---

export const toolPlatforms = pgTable(
	"tool_platforms",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		toolId: uuid("tool_id")
			.notNull()
			.references(() => tools.id, { onDelete: "cascade" }),
		platformId: uuid("platform_id")
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
