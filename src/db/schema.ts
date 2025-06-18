import { account, session, user, verification } from "./auth-schema"
//tables imports
import { tools } from "./tables/tools"
import { categories } from "./tables/categories"
import { platforms } from "./tables/platforms"
import { tags } from "./tables/tags"
import { creators } from "./tables/creators"
import { features } from "./tables/features"
import { reactions } from "./tables/reactions"

//joint tables imports
import { toolCategories } from "./tables/joint/toolCategories"
import { toolCreators } from "./tables/joint/toolCreators"
import { toolPlatforms } from "./tables/joint/toolPlatforms"
import { toolTags } from "./tables/joint/toolTags"
import { toolAlternatives } from "./tables/joint/toolAlternatives"
import { toolIntegrations } from "./tables/joint/toolIntegrations"
import {
	categoryRelations,
	commentRelations,
	creatorRelations,
	featureRelations,
	platformRelations,
	reactionRelations,
	tagRelations,
	toolAlternativeRelations,
	toolCategoryRelations,
	toolCreatorRelations,
	toolFeatureRelations,
	toolIntegrationRelations,
	toolPlatformRelations,
	toolRelations,
	toolTagRelations,
} from "./relations"

// Exporting core tables
export {
	account,
	session,
	user,
	verification,
	tools,
	categories,
	platforms,
	tags,
	creators,
	features,
	reactions,
}

// Exporting joint tables
export {
	toolCategories,
	toolCreators,
	toolPlatforms,
	toolTags,
	toolAlternatives,
	toolIntegrations,
}

// Exporting relations
export {
	toolRelations,
	categoryRelations,
	creatorRelations,
	featureRelations,
	platformRelations,
	reactionRelations,
	tagRelations,
	commentRelations,
}

// Exporting joint relations
export {
	toolAlternativeRelations,
	toolCategoryRelations,
	toolCreatorRelations,
	toolFeatureRelations,
	toolIntegrationRelations,
	toolTagRelations,
	toolPlatformRelations,
}
