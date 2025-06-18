import { relations } from "drizzle-orm";
import { platforms } from "../tables/platforms";
import { toolPlatforms } from "../tables/joint/toolPlatforms";

export const platformRelations = relations(platforms, ({ many }) => ({
  tools: many(toolPlatforms, { relationName: 'platform_tools' }),
}));