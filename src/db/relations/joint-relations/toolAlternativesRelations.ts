import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { toolAlternatives } from "../../tables/joint/toolAlternatives";

export const toolAlternativeRelations = relations(toolAlternatives, ({ one }) => ({
  tool: one(tools, { fields: [toolAlternatives.toolId], references: [tools.id], relationName: 'tool_alternatives_tool' }),
  alternative: one(tools, { fields: [toolAlternatives.alternativeToolId], references: [tools.id], relationName: 'tool_alternatives_alternative' }),
}));