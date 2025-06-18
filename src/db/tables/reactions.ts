import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { tools } from "./tools"

export const reactionTypes = pgEnum("reaction_type", ["upvote", "downvote"])

// --- Reactions ---
export const reactions = pgTable(
	"reactions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id").notNull(),
		toolId: uuid("tool_id")
			.notNull()
			.references(() => tools.id, { onDelete: "cascade" }),
		reactionType: reactionTypes("reaction_type").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		// one user to one vote to one tool
		unique("user_tool_reaction_unique").on(table.userId, table.toolId),
		index("user_tool_reaction_index").on(table.userId, table.toolId),
	]
)
