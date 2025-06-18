import {
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// --- Platforms ---

export const platforms = pgTable(
	"platforms",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		slug: text("slug").notNull(),
		imageUrl: text("image_url"),
		description: text("description"),
		json: jsonb("json"), // todo : generate a json schema for this
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [index("platform_tools_index").on(table.id)]
)

// schema and types
export const insertPlatformSchema = createInsertSchema(platforms)
export const selectPlatformSchema = createSelectSchema(platforms)
export type InsertPlatformType = typeof platforms.$inferInsert
export type SelectPlatformType = typeof platforms.$inferSelect

// joins with  - tools, categories, tags, creators
