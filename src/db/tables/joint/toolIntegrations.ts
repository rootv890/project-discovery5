import { pgTable, uuid } from "drizzle-orm/pg-core"
import { tools } from "../tools"

export const toolIntegrations = pgTable("tool_integrations", {
	id: uuid("id").primaryKey().defaultRandom(),
	toolId: uuid("tool_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
	integratesWithId: uuid("integrates_with_id")
		.notNull()
		.references(() => tools.id, { onDelete: "cascade" }),
})
