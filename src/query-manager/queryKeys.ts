export const queryKeys = {
	// Auth / User
	// Tools
	tools: {
		// will fetch with features, catgories, tags, platforms
		all: () => ["tools"] as const,
		list: () => [...queryKeys.tools.all(), "list"] as const,

		cardDetail: (id: string) =>
			[...queryKeys.tools.all(), "card-detail", id] as const,
		fullDetail: (id: string) =>
			[...queryKeys.tools.all(), "full-detail", id] as const,
	},
	// Categories
	// Platforms
	// Tags
	// Comments
	// Reactions
	// Features
}
