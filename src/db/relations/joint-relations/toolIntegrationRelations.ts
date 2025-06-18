import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { toolIntegrations } from "../../tables/joint/toolIntegrations";

export const toolIntegrationRelations = relations(toolIntegrations, ({ one }) => ({
  tool: one(tools, { fields: [toolIntegrations.toolId], references: [tools.id], relationName: 'tool_integrations_tool' }),
  integratesWith: one(tools, { fields: [toolIntegrations.integratesWithId], references: [tools.id], relationName: 'tool_integrations_integrates_with' }),
}));