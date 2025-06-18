import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { platforms } from "../../tables/platforms";
import { toolPlatforms } from "../../tables/joint/toolPlatforms";

export const toolPlatformRelations = relations(toolPlatforms, ({ one }) => ({
  tool: one(tools, { fields: [toolPlatforms.toolId], references: [tools.id], relationName: 'tool_platforms_tool' }),
  platform: one(platforms, { fields: [toolPlatforms.platformId], references: [platforms.id], relationName: 'tool_platforms_platform' }),
}));