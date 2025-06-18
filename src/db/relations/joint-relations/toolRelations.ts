import { relations } from 'drizzle-orm';
import { tools } from '../../tables/tools';
import { toolCategories } from '../../tables/joint/toolCategories';
import { toolPlatforms } from '../../tables/joint/toolPlatforms';
import { comments } from '../../tables/comments';
import { reactions } from '../../tables/reactions';
import { toolTags } from '../../tables/joint/toolTags';
import { toolFeatures } from '../../tables/joint/toolFeatures';
import { toolIntegrations } from '../../tables/joint/toolIntegrations';
import { toolAlternatives } from '../../tables/joint/toolAlternatives';
import { toolCompanies } from '../../tables/joint/toolCompanies';

export const toolRelations = relations(tools, ({ many }) => ({
  categories: many(toolCategories, { relationName: 'tool_categories' }),
  platforms: many(toolPlatforms, { relationName: 'tool_platforms' }),
  comments: many(comments, { relationName: 'tool_comments' }),
  reactions: many(reactions, { relationName: 'tool_reactions' }),
  tags: many(toolTags, { relationName: 'tool_tags' }),
  features: many(toolFeatures, { relationName: 'tool_features' }),
  integrations: many(toolIntegrations, { relationName: 'tool_integrations' }),
  alternatives: many(toolAlternatives, { relationName: 'tool_alternatives' }),
  companies: many(toolCompanies, { relationName: 'tool_companies' }),
}));
