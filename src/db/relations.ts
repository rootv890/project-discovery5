// --- Relations ---

import { relations } from "drizzle-orm"
import { toolCategories } from "./tables/joint/toolCategories"
import { toolPlatforms } from "./tables/joint/toolPlatforms"
import { comments } from "./tables/comments"
import { reactions } from "./tables/reactions"
import { toolTags } from "./tables/joint/toolTags"
import { toolIntegrations } from "./tables/joint/toolIntegrations"
import { toolCreators } from "./tables/joint/toolCreators"
import { categories } from "./tables/categories"
import { tags } from "./tables/tags"
import { platforms } from "./tables/platforms"
import { features } from "./tables/features"
import { creators } from "./tables/creators"
import { tools } from "./tables/tools"
import { toolAlternatives } from "./tables/joint/toolAlternatives"

export const toolRelations = relations(tools, ({ many, one }) => ({
	categories: many(toolCategories, { relationName: "tool_categories" }),
	platforms: many(toolPlatforms, { relationName: "tool_platforms" }),
	comments: many(comments, { relationName: "tool_comments" }),
	reactions: many(reactions, { relationName: "tool_reactions" }),
	feature: one(features, {
		fields: [features.toolId],
		references: [tools.id],
		relationName: "tool_feature",
	}),
	tags: many(toolTags, { relationName: "tool_tags" }),
	integrations: many(toolIntegrations, { relationName: "tool_integrations" }),
	alternatives: many(toolAlternatives, { relationName: "tool_alternatives" }),
	// debate :  one or many creators ? for now many
	creators: many(toolCreators, { relationName: "tool_creators" }),
}))

export const categoryRelations = relations(categories, ({ many }) => ({
	tools: many(toolCategories, { relationName: "category_tools" }),
}))

export const platformRelations = relations(platforms, ({ many }) => ({
	tools: many(toolPlatforms, { relationName: "platform_tools" }),
}))

export const tagRelations = relations(tags, ({ many }) => ({
	tools: many(toolTags, { relationName: "tag_tools" }),
}))

export const featureRelations = relations(features, ({ one }) => ({
	tool: one(tools, {
		fields: [features.toolId],
		references: [tools.id],
		relationName: "feature_tool",
	}),
}))

export const creatorRelations = relations(creators, ({ many }) => ({
	toolCreators: many(toolCreators, {
		relationName: "creator_tool_creators",
	}),
}))

export const toolCategoryRelations = relations(toolCategories, ({ one }) => ({
	tool: one(tools, {
		fields: [toolCategories.toolId],
		references: [tools.id],
		relationName: "tool_categories_tool",
	}),
	category: one(categories, {
		fields: [toolCategories.categoryId],
		references: [categories.id],
		relationName: "tool_categories_category",
	}),
}))

export const toolPlatformRelations = relations(toolPlatforms, ({ one }) => ({
	tool: one(tools, {
		fields: [toolPlatforms.toolId],
		references: [tools.id],
		relationName: "tool_platforms_tool",
	}),
	platform: one(platforms, {
		fields: [toolPlatforms.platformId],
		references: [platforms.id],
		relationName: "tool_platforms_platform",
	}),
}))

export const toolTagRelations = relations(toolTags, ({ one }) => ({
	tool: one(tools, {
		fields: [toolTags.toolId],
		references: [tools.id],
		relationName: "tool_tags_tool",
	}),
	tag: one(tags, {
		fields: [toolTags.tagId],
		references: [tags.id],
		relationName: "tool_tags_tag",
	}),
}))

export const toolFeatureRelations = relations(features, ({ one }) => ({
	tool: one(tools, {
		fields: [features.toolId],
		references: [tools.id],
		relationName: "tool_features_tool",
	}),
	feature: one(features, {
		fields: [features.id],
		references: [features.id],
		relationName: "tool_features_feature",
	}),
}))

export const toolIntegrationRelations = relations(
	toolIntegrations,
	({ one }) => ({
		tool: one(tools, {
			fields: [toolIntegrations.toolId],
			references: [tools.id],
			relationName: "tool_integrations_tool",
		}),
		integratesWith: one(tools, {
			fields: [toolIntegrations.integratesWithId],
			references: [tools.id],
			relationName: "tool_integrations_integrates_with",
		}),
	})
)

export const toolAlternativeRelations = relations(
	toolAlternatives,
	({ one }) => ({
		tool: one(tools, {
			fields: [toolAlternatives.toolId],
			references: [tools.id],
			relationName: "tool_alternatives_tool",
		}),
		alternative: one(tools, {
			fields: [toolAlternatives.alternativeToolId],
			references: [tools.id],
			relationName: "tool_alternatives_alternative",
		}),
	})
)

export const toolCreatorRelations = relations(toolCreators, ({ one }) => ({
	tool: one(tools, {
		fields: [toolCreators.toolId],
		references: [tools.id],
		relationName: "tool_creators_tool",
	}),
	creator: one(creators, {
		fields: [toolCreators.creatorId],
		references: [creators.id],
		relationName: "tool_creators_creator",
	}),
}))

export const commentRelations = relations(comments, ({ one, many }) => ({
	parent: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
		relationName: "comment_parent",
	}),
	replies: many(comments, { relationName: "comment_parent" }),
}))

export const reactionRelations = relations(reactions, ({ one }) => ({
	tool: one(tools, {
		fields: [reactions.toolId],
		references: [tools.id],
		relationName: "reaction_tool",
	}),
}))

// TODO - low priority : move all relations to respective table files
