import { relations } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  text,
  jsonb,
} from 'drizzle-orm/pg-core';

// --- Core Tables ---


// --- Categories ---

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});

// --- Platforms ---

export const platforms = pgTable('platforms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});

// --- Tags ---

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

// --- Features (offer T14X) ---

export const features = pgTable('features', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

// --- Resources (offer T14X) ---

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  url: text('url'),
  format: text('format'), // paid, free, interactive, etc.
  type: text('type'),     // book, course, tutorial
});


// --- Companies ( offerT14X) ---

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  website: text('website'),
});

// --- Main Entity ---

// --- Tools ---

export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
  json: jsonb('json'),
});

// --- Join Tables ---


// --- Tool-Categories ---

export const toolCategories = pgTable('tool_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});


// --- Tool-Platforms ---

export const toolPlatforms = pgTable('tool_platforms', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  platformId: uuid('platform_id')
    .notNull()
    .references(() => platforms.id, { onDelete: 'cascade' }),
});

// --- Tool-Tags ---

export const toolTags = pgTable('tool_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
});


// --- Tool-Features ---

export const toolFeatures = pgTable('tool_features', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  featureId: uuid('feature_id')
    .notNull()
    .references(() => features.id, { onDelete: 'cascade' }),
});


// --- Tool-Resources ---

export const toolResources = pgTable('tool_resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resources.id, { onDelete: 'cascade' }),
});

// --- Tool-Integrations ---

export const toolIntegrations = pgTable('tool_integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  integratesWithId: uuid('integrates_with_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
});


// --- Tool-Alternatives ---

export const toolAlternatives = pgTable('tool_alternatives', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  alternativeToolId: uuid('alternative_tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
});

// --- Tool-Companies ---

export const toolCompanies = pgTable('tool_companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
});

// --- Comments and Reactions ---

// there are 2 errors from the word "comments". 
//TODO: research how to fix it. 

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  content: text('content').notNull(),
  parentId: uuid('parent_id').references(() => comments.id, { onDelete: 'set null' }),
  targetType: text('target_type').notNull(), // e.g., "Tool", "Resource"
  targetId: uuid('target_id').notNull(),
});

export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  toolId: uuid('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  reactType: text('react_type').notNull(), // e.g., "like", "love", etc.
});

// --- Relations ---

export const toolRelations = relations(tools, ({ many }) => ({
  categories: many(toolCategories, { relationName: 'tool_categories' }),
  platforms: many(toolPlatforms, { relationName: 'tool_platforms' }),
  comments: many(comments, { relationName: 'tool_comments' }),
  reactions: many(reactions, { relationName: 'tool_reactions' }),
  tags: many(toolTags, { relationName: 'tool_tags' }),
  features: many(toolFeatures, { relationName: 'tool_features' }),
  resources: many(toolResources, { relationName: 'tool_resources' }),
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

export const resourceRelations = relations(resources, ({ many }) => ({
  toolResources: many(toolResources, { relationName: 'resource_tool_resources' }),
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

export const toolResourceRelations = relations(toolResources, ({ one }) => ({
  tool: one(tools, { fields: [toolResources.toolId], references: [tools.id], relationName: 'tool_resources_tool' }),
  resource: one(resources, { fields: [toolResources.resourceId], references: [resources.id], relationName: 'tool_resources_resource' }),
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
