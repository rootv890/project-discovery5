import { relations } from "drizzle-orm";
import { features } from "../tables/features";
import { toolFeatures } from "../tables/joint/toolFeatures";

export const featureRelations = relations(features, ({ many }) => ({
    toolFeatures: many(toolFeatures, { relationName: 'feature_tool_features' }),
  }));