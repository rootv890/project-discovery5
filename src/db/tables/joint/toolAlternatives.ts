// I don't think we need this table for V1
import { generateId } from "@/lib/utils"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"

// --- Tool-Alternatives ---

export const toolAlternatives = pgTable("tool_alternatives", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateId("other")),
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	alternativeToolId: text("alternative_tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
})
