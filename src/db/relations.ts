// --- Relations ---More actions

import { relations } from "drizzle-orm";
import { toolCategories } from "./tables/joint/toolCategories";
import { toolPlatforms } from "./tables/joint/toolPlatforms";
import { comments } from "./tables/comments";
import { reactions } from "./tables/reactions";
import { toolTags } from "./tables/joint/toolTags";
import { toolFeatures } from "./tables/joint/toolFeatures";
import { toolIntegrations } from "./tables/joint/toolIntegrations";
import { toolAlternatives } from "./tables/joint/toolAlternatives";
import { toolCompanies } from "./tables/joint/toolCompanies";
import { categories } from "./tables/categories";
import { tags } from "./tables/tags";
import { platforms } from "./tables/platforms";
import { features } from "./tables/features";
import { companies } from "./tables/companies";
import { tools } from "./tables/tools";

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
  
  export const categoryRelations = relations(categories, ({ many }) => ({
    tools: many(toolCategories, { relationName: 'category_tools' }),
  }));
  
  export const platformRelations = relations(platforms, ({ many }) => ({
    tools: many(toolPlatforms, { relationName: 'platform_tools' }),
  }));
  
  export const tagRelations = relations(tags, ({ many }) => ({
    toolTags: many(toolTags, { relationName: 'tag_tool_tags' }),
  }));
  
  export const featureRelations = relations(features, ({ many }) => ({
    toolFeatures: many(toolFeatures, { relationName: 'feature_tool_features' }),
  }));
  
  
  export const companyRelations = relations(companies, ({ many }) => ({
    toolCompanies: many(toolCompanies, { relationName: 'company_tool_companies' }),
  }));
  
  export const toolCategoryRelations = relations(toolCategories, ({ one }) => ({
    tool: one(tools, { fields: [toolCategories.toolId], references: [tools.id], relationName: 'tool_categories_tool' }),
    category: one(categories, { fields: [toolCategories.categoryId], references: [categories.id], relationName: 'tool_categories_category' }),
  }));
  
  export const toolPlatformRelations = relations(toolPlatforms, ({ one }) => ({
    tool: one(tools, { fields: [toolPlatforms.toolId], references: [tools.id], relationName: 'tool_platforms_tool' }),
    platform: one(platforms, { fields: [toolPlatforms.platformId], references: [platforms.id], relationName: 'tool_platforms_platform' }),
  }));
  
  export const toolTagRelations = relations(toolTags, ({ one }) => ({
    tool: one(tools, { fields: [toolTags.toolId], references: [tools.id], relationName: 'tool_tags_tool' }),
    tag: one(tags, { fields: [toolTags.tagId], references: [tags.id], relationName: 'tool_tags_tag' }),
  }));
  
  export const toolFeatureRelations = relations(toolFeatures, ({ one }) => ({
    tool: one(tools, { fields: [toolFeatures.toolId], references: [tools.id], relationName: 'tool_features_tool' }),
    feature: one(features, { fields: [toolFeatures.featureId], references: [features.id], relationName: 'tool_features_feature' }),
  }));
  
  export const toolIntegrationRelations = relations(toolIntegrations, ({ one }) => ({
    tool: one(tools, { fields: [toolIntegrations.toolId], references: [tools.id], relationName: 'tool_integrations_tool' }),
    integratesWith: one(tools, { fields: [toolIntegrations.integratesWithId], references: [tools.id], relationName: 'tool_integrations_integrates_with' }),
  }));
  
  export const toolAlternativeRelations = relations(toolAlternatives, ({ one }) => ({
    tool: one(tools, { fields: [toolAlternatives.toolId], references: [tools.id], relationName: 'tool_alternatives_tool' }),
    alternative: one(tools, { fields: [toolAlternatives.alternativeToolId], references: [tools.id], relationName: 'tool_alternatives_alternative' }),
  }));
  
  export const toolCompanyRelations = relations(toolCompanies, ({ one }) => ({
    tool: one(tools, { fields: [toolCompanies.toolId], references: [tools.id], relationName: 'tool_companies_tool' }),
    company: one(companies, { fields: [toolCompanies.companyId], references: [companies.id], relationName: 'tool_companies_company' }),
  }));
  
  export const commentRelations = relations(comments, ({ one, many }) => ({
    parent: one(comments, {
      fields: [comments.parentId],
      references: [comments.id],
      relationName: 'comment_parent',
    }),
    replies: many(comments, { relationName: 'comment_parent' }),
  }));
  
  export const reactionRelations = relations(reactions, ({ one }) => ({
    tool: one(tools, { fields: [reactions.toolId], references: [tools.id], relationName: 'reaction_tool' }),
  }));