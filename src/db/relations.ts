// --- Relations ---
import { relations } from "drizzle-orm"
import { awards } from "./tables/awards"
import { categories } from "./tables/categories"
import { comments } from "./tables/comments"
import { creators } from "./tables/creators"
import { features } from "./tables/features"
import { toolAlternatives } from "./tables/joint/toolAlternatives"
import { toolAwards } from "./tables/joint/toolAwards"
import { toolCategories } from "./tables/joint/toolCategories"
import { toolCreators } from "./tables/joint/toolCreators"
import { toolIntegrations } from "./tables/joint/toolIntegrations"
import { toolPlatforms } from "./tables/joint/toolPlatforms"
import { toolTags } from "./tables/joint/toolTags"
import { platforms } from "./tables/platforms"
import { reactions } from "./tables/reactions"
import { tags } from "./tables/tags"
import { tools } from "./tables/tools"

export const toolRelations = relations(tools, ({ many, one }) => ({
	categories: many(toolCategories, { relationName: "tool_categories_tool" }),
	platforms: many(toolPlatforms, { relationName: "tool_platforms_tool" }),
	// P
	comments: many(comments, {
		relationName: "tool_comments",
	}),
	reactions: many(reactions, { relationName: "reaction_tool" }),
	awards: many(toolAwards, { relationName: "tool_award_tool" }),
	feature: one(features, {
		fields: [tools.id],
		references: [features.toolId],
		relationName: "feature_tool",
	}),
	tags: many(toolTags, { relationName: "tool_tags_tool" }),
	integrations: many(toolIntegrations, {
		relationName: "tool_integrations_tool",
	}),
	alternatives: many(toolAlternatives, {
		relationName: "tool_alternatives_tool",
	}),
	creators: many(toolCreators, { relationName: "tool_creators_tool" }),
}))

export const categoryRelations = relations(categories, ({ many }) => ({
	toolCategories: many(toolCategories, {
		relationName: "tool_categories_category",
	}),
}))

export const platformRelations = relations(platforms, ({ many }) => ({
	toolPlatforms: many(toolPlatforms, {
		relationName: "tool_platforms_platform",
	}),
}))

export const tagRelations = relations(tags, ({ many }) => ({
	toolTags: many(toolTags, { relationName: "tool_tags_tag" }),
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
		relationName: "tool_creators_creator",
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
	// ✅ Relation to tool (polymorphic base case)
	tool: one(tools, {
		fields: [comments.toolId],
		references: [tools.id],
		relationName: "tool_comments",
	}),

	// ✅ Self-referencing parent comment (for threads)
	parent: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
		relationName: "comment_parent",
	}),

	// ✅ Replies to this comment
	replies: many(comments, {
		relationName: "comment_parent",
	}),
}))

export const reactionRelations = relations(reactions, ({ one }) => ({
	tool: one(tools, {
		fields: [reactions.toolId],
		references: [tools.id],
		relationName: "reaction_tool",
	}),
}))

export const toolAwardRelations = relations(toolAwards, ({ one }) => ({
	tool: one(tools, {
		fields: [toolAwards.toolId],
		references: [tools.id],
		relationName: "tool_award_tool",
	}),
	award: one(awards, {
		fields: [toolAwards.awardId],
		references: [awards.id],
		relationName: "tool_award_award",
	}),
}))

export const awardRelations = relations(awards, ({ many }) => ({
	toolAwards: many(toolAwards, { relationName: "tool_award_award" }),
}))
