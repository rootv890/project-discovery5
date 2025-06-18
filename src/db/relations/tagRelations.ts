import { relations } from "drizzle-orm";
import { toolTags } from "../tables/joint/toolTags";
import { tags } from "../tables/tags";

export const tagRelations = relations(tags, ({ many }) => ({
  toolTags: many(toolTags, { relationName: 'tag_tool_tags' }),
}));