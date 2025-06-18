import { relations } from "drizzle-orm";
import { tools } from "../tables/tools";
import { reactions } from "../tables/reactions";

export const reactionRelations = relations(reactions, ({ one }) => ({
  tool: one(tools, { fields: [reactions.toolId], references: [tools.id], relationName: 'reaction_tool' }),
}));