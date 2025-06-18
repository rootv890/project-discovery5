import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { toolTags } from "../../tables/joint/toolTags";
import { tags } from "../../tables/tags";

export const toolTagRelations = relations(toolTags, ({ one }) => ({
  tool: one(tools, { fields: [toolTags.toolId], references: [tools.id], relationName: 'tool_tags_tool' }),
  tag: one(tags, { fields: [toolTags.tagId], references: [tags.id], relationName: 'tool_tags_tag' }),
}));