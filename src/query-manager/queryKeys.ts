export const queryKeys = {
	// Auth / User
	// Tools
	tools: {
		// will fetch with features, catgories, tags, platforms
		all: () => ["tools"] as const,
		list: () => [...queryKeys.tools.all(), "list"] as const,
		detail: (id: string) => [...queryKeys.tools.all(), "detail", id] as const,
	},
	// Categories
	// Platforms
	// Tags
	// Comments
	// Reactions
	// Features
}
