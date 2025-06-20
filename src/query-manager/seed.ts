// Simple Seed Data for the app

import { InsertToolType } from "@/db/schema"

// Tools with features, categories, tags, platforms

const tools: InsertToolType[] = [
	{
		name: "Figma",
		description: "Figma is a vector graphics editor and prototyping tool.",
		slug: "figma",
		imageUrl:
			"https://cdn.sanity.io/images/599r6htc/regionalized/af397d4468a4ad139e2603bf947e90075bedef91-375x188.svg?q=75&fit=max&auto=format",
		json: {
			// descriptive features in json as markdown
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]
