import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"

export const toolIntegrations = pgTable("tool_integrations", {
	id: text("id").primaryKey(),
	toolId: text("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	integratesWithId: text("integrates_with_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
})
