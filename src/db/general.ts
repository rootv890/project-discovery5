import { relations } from 'drizzle-orm';
import {
    pgTable,
    uuid,
    text,
    jsonb,
  } from 'drizzle-orm/pg-core';
 
  
  // --- Categories Table ---
  export const categories = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    description: text('description'),
    json: jsonb('json'),
  });
  
  // --- Tools Table ---
  export const tools = pgTable('tools', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    description: text('description'),
    json: jsonb('json'),
  });
  
  // --- Tools-Categories Join Table ---
  export const toolCategories = pgTable('tool_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    categoryId: uuid('category_id').notNull().references(() => categories.id),
  });
  
  // --- Platforms Table ---
  export const platforms = pgTable('platforms', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    description: text('description'),
    json: jsonb('json'),
  });
  
  // --- Tool-Platforms Join Table ---
  export const toolPlatforms = pgTable('tool_platforms', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    platformId: uuid('platform_id').notNull().references(() => platforms.id),
  });
  // --- Comments Table ---
export const comments = pgTable('comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    content: text('content').notNull(),
    parentId: uuid('parent_id'),
    targetType: text('target_type').notNull(), // e.g., "Tool", "Resource"
    targetId: uuid('target_id').notNull(),
  });
  
  // --- Reactions Table ---
  export const reactions = pgTable('reactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    reactType: text('react_type').notNull(), // e.g., "like", "love", etc.
  });
  
  // --- Tags Table ---
  export const tags = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
  });
  
  // --- Tool_Tags Join Table ---
  export const toolTags = pgTable('tool_tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    tagId: uuid('tag_id').notNull().references(() => tags.id),
  });
  




  //-- DEFINING RELATIONS ---
  export const toolRelations = relations(tools, ({ many }) => ({
    categories: many(toolCategories),
    platforms: many(toolPlatforms),
    comments: many(comments, { relationName: 'tool_comments' }),
    reactions: many(reactions),
    tags: many(toolTags),
    features: many(toolFeatures),
    resources: many(toolResources),
    integrations: many(toolIntegrations),
    alternatives: many(toolAlternatives),
    companies: many(toolCompanies),
  }));
  
  
  export const categoryRelations = relations(categories, ({ many }) => ({
    tools: many(toolCategories),
  }));
  
  export const platformRelations = relations(platforms, ({ many }) => ({
    tools: many(toolPlatforms),
  }));
  
  export const toolCategoryRelations = relations(toolCategories, ({ one }) => ({
    tool: one(tools, { fields: [toolCategories.toolId], references: [tools.id] }),
    category: one(categories, { fields: [toolCategories.categoryId], references: [categories.id] }),
  }));
  
  export const toolPlatformRelations = relations(toolPlatforms, ({ one }) => ({
    tool: one(tools, { fields: [toolPlatforms.toolId], references: [tools.id] }),
    platform: one(platforms, { fields: [toolPlatforms.platformId], references: [platforms.id] }),
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
    tool: one(tools, { fields: [reactions.toolId], references: [tools.id] }),
  }));
  
  export const toolTagRelations = relations(toolTags, ({ one }) => ({
    tool: one(tools, { fields: [toolTags.toolId], references: [tools.id] }),
    tag: one(tags, { fields: [toolTags.tagId], references: [tags.id] }),
  }));
  
  export const tagRelations = relations(tags, ({ many }) => ({
    toolTags: many(toolTags),
  }));
  

  // tools - already defined

export const features = pgTable('features', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
  });
  
  export const toolFeatures = pgTable('tool_features', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    featureId: uuid('feature_id').notNull().references(() => features.id),
  });
  
  // resources
  export const resources = pgTable('resources', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    url: text('url'),
    format: text('format'), // paid, free, interactive, etc.
    type: text('type'),     // book, course, tutorial
  });
  
  export const toolResources = pgTable('tool_resources', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    resourceId: uuid('resource_id').notNull().references(() => resources.id),
  });
  
  // integrations (self-referencing many-to-many on tools)
  export const toolIntegrations = pgTable('tool_integrations', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    integratesWithId: uuid('integrates_with_id').notNull().references(() => tools.id),
  });
  
  // alternatives (same idea as integrations)
  export const toolAlternatives = pgTable('tool_alternatives', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    alternativeToolId: uuid('alternative_tool_id').notNull().references(() => tools.id),
  });
  
  // companies
  export const companies = pgTable('companies', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    website: text('website'),
  });
  
  export const toolCompanies = pgTable('tool_companies', {
    id: uuid('id').primaryKey().defaultRandom(),
    toolId: uuid('tool_id').notNull().references(() => tools.id),
    companyId: uuid('company_id').notNull().references(() => companies.id),
  });


  // --- offered relations---


  //---  Tool-Feature Relation ---

  export const featureRelations = relations(features, ({ many }) => ({
    toolFeatures: many(toolFeatures),
  }));
  
  export const toolFeatureRelations = relations(toolFeatures, ({ one }) => ({
    tool: one(tools, {
      fields: [toolFeatures.toolId],
      references: [tools.id],
    }),
    feature: one(features, {
      fields: [toolFeatures.featureId],
      references: [features.id],
    }),
  }));
  
  // ---Tool-Resource Relations--
  export const resourceRelations = relations(resources, ({ many }) => ({
    toolResources: many(toolResources),
  }));
  
  export const toolResourceRelations = relations(toolResources, ({ one }) => ({
    tool: one(tools, {
      fields: [toolResources.toolId],
      references: [tools.id],
    }),
    resource: one(resources, {
      fields: [toolResources.resourceId],
      references: [resources.id],
    }),
  }));

  
  //--- Tool Integrations---
  export const toolIntegrationRelations = relations(toolIntegrations, ({ one }) => ({
    tool: one(tools, {
      fields: [toolIntegrations.toolId],
      references: [tools.id],
    }),
    integratesWith: one(tools, {
      fields: [toolIntegrations.integratesWithId],
      references: [tools.id],
    }),
  }));
  

  // ----Tool Alternatives---
  export const toolAlternativeRelations = relations(toolAlternatives, ({ one }) => ({
    tool: one(tools, {
      fields: [toolAlternatives.toolId],
      references: [tools.id],
    }),
    alternative: one(tools, {
      fields: [toolAlternatives.alternativeToolId],
      references: [tools.id],
    }),
  }));
  

  //--- Tool-Company Relations ---
  export const companyRelations = relations(companies, ({ many }) => ({
    toolCompanies: many(toolCompanies),
  }));
  
  export const toolCompanyRelations = relations(toolCompanies, ({ one }) => ({
    tool: one(tools, {
      fields: [toolCompanies.toolId],
      references: [tools.id],
    }),
    company: one(companies, {
      fields: [toolCompanies.companyId],
      references: [companies.id],
    }),
  }));
  
