// Auth
export * from "./auth-schema"

// Core tables
export * from "./tables/tools"
export * from "./tables/categories"
export * from "./tables/platforms"
export * from "./tables/tags"
export * from "./tables/creators"
export * from "./tables/features"
export * from "./tables/reactions"
export * from "./tables/comments"

// Joint tables
export * from "./tables/joint/toolCategories"
export * from "./tables/joint/toolCreators"
export * from "./tables/joint/toolPlatforms"
export * from "./tables/joint/toolTags"
export * from "./tables/joint/toolIntegrations"

// All relations (core + joint)
export * from "./relations"
