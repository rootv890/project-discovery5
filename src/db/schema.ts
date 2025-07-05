// Auth
export * from "./auth-schema"

// Core tables
export * from "./tables/categories"
export * from "./tables/comments"
export * from "./tables/creators"
export * from "./tables/features"
export * from "./tables/platforms"
export * from "./tables/reactions"
export * from "./tables/tags"
export * from "./tables/tools"

// Joint tables
export * from "./tables/joint/toolAlternatives"
export * from "./tables/joint/toolAwards"
export * from "./tables/joint/toolCategories"
export * from "./tables/joint/toolCreators"
export * from "./tables/joint/toolIntegrations"
export * from "./tables/joint/toolPlatforms"
export * from "./tables/joint/toolTags"
// All relations (core + joint)
export * from "./relations"
