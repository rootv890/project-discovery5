import { relations } from "drizzle-orm";
import { tools } from "../../tables/tools";
import { features } from "../../tables/features";
import { toolFeatures } from "../../tables/joint/toolFeatures";

export const toolFeatureRelations = relations(toolFeatures, ({ one }) => ({
  tool: one(tools, { fields: [toolFeatures.toolId], references: [tools.id], relationName: 'tool_features_tool' }),
  feature: one(features, { fields: [toolFeatures.featureId], references: [features.id], relationName: 'tool_features_feature' }),
}));