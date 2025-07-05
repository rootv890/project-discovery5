import { generateId } from "@/lib/utils"
import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
} from "drizzle-orm/pg-core"
import { user } from "../auth-schema"
import { tools } from "./tools"

export const reactionTypes = pgEnum("reaction_type", ["upvote", "downvote"])

// --- Reactions ---
export const reactions = pgTable(
	"reactions",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId("other")),
		userId: text("user_id")
			.references(() => user.id, {
				onDelete: "set null",
			})
			.notNull(),
		toolId: text("tool_id")
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
