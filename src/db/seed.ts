// seed.ts

import { db } from "./db"
import { categories, toolCategories, tools } from "./schema"

const sharedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-replace-all-icon lucide-replace-all"><path d="M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M14 4a2 2 0 0 1 2-2"/><path d="M16 10a2 2 0 0 1-2-2"/><path d="M20 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M20 2a2 2 0 0 1 2 2"/><path d="M22 8a2 2 0 0 1-2 2"/><path d="m3 7 3 3 3-3"/><path d="M6 10V5a 3 3 0 0 1 3-3h1"/><rect x="2" y="14" width="8" height="8" rx="2"/></svg>`

const categoryData = [
	{
		id: "c93x0a",
		name: "AI Tools",
		slug: "ai-tools",
		image_url: "https://example.com/images/ai.png",
		icon_svg: sharedIcon,
		description: "Explore cutting-edge AI tools and platforms.",
	},
	{
		id: "c1k9ez",
		name: "Developer Tools",
		slug: "developer-tools",
		image_url: "https://example.com/images/dev.png",
		icon_svg: sharedIcon,
		description: "Resources and tools for software developers.",
	},
	{
		id: "c3plmz",
		name: "Design",
		slug: "design",
		image_url: "https://example.com/images/design.png",
		icon_svg: sharedIcon,
		description: "Design inspiration, UI kits, and creative assets.",
	},
	{
		id: "c85qtw",
		name: "Productivity",
		slug: "productivity",
		image_url: "https://example.com/images/productivity.png",
		icon_svg: sharedIcon,
		description:
			"Boost your workflow and efficiency with top productivity tools.",
	},
	{
		id: "c4drx8",
		name: "Marketing",
		slug: "marketing",
		image_url: "https://example.com/images/marketing.png",
		icon_svg: sharedIcon,
		description: "Marketing automation, SEO, and campaign tools.",
	},
	{
		id: "c0fsv9",
		name: "Writing & Content",
		slug: "writing-content",
		image_url: "https://example.com/images/writing.png",
		icon_svg: sharedIcon,
		description: "Content creation tools for writers, bloggers, and marketers.",
	},
	{
		id: "c2mqxe",
		name: "Video & Animation",
		slug: "video-animation",
		image_url: "https://example.com/images/video.png",
		icon_svg: sharedIcon,
		description: "Video editing, motion graphics, and animation tools.",
	},
	{
		id: "cyz3r4",
		name: "Analytics",
		slug: "analytics",
		image_url: "https://example.com/images/analytics.png",
		icon_svg: sharedIcon,
		description: "Track user behavior, metrics, and KPIs easily.",
	},
	{
		id: "c7bhrn",
		name: "Education",
		slug: "education",
		image_url: "https://example.com/images/education.png",
		icon_svg: sharedIcon,
		description: "Learning platforms, courses, and educational apps.",
	},
	{
		id: "ctz8uw",
		name: "E-commerce",
		slug: "ecommerce",
		image_url: "https://example.com/images/ecommerce.png",
		icon_svg: sharedIcon,
		description: "Sell online with e-commerce tools and storefront builders.",
	},
	{
		id: "c4x1pe",
		name: "Finance",
		slug: "finance",
		image_url: "https://example.com/images/finance.png",
		icon_svg: sharedIcon,
		description: "Manage budgets, track investments, and handle crypto.",
	},
	{
		id: "c2b9tr",
		name: "Health & Wellness",
		slug: "health-wellness",
		image_url: "https://example.com/images/health.png",
		icon_svg: sharedIcon,
		description: "Apps for fitness tracking, meditation, and well-being.",
	},
	{
		id: "c0k9lm",
		name: "No-Code",
		slug: "no-code",
		image_url: "https://example.com/images/nocode.png",
		icon_svg: sharedIcon,
		description: "Build apps and workflows without writing code.",
	},
	{
		id: "cmt8bv",
		name: "3D & AR/VR",
		slug: "3d-ar-vr",
		image_url: "https://example.com/images/3dvr.png",
		icon_svg: sharedIcon,
		description: "Tools for creating 3D models, AR, and VR content.",
	},
	{
		id: "cj9r2s",
		name: "APIs & Integrations",
		slug: "api-integrations",
		image_url: "https://example.com/images/api.png",
		icon_svg: sharedIcon,
		description: "Connect systems with APIs, SDKs, and webhooks.",
	},
	{
		id: "cpl4na",
		name: "Project Management",
		slug: "project-management",
		image_url: "https://example.com/images/pm.png",
		icon_svg: sharedIcon,
		description: "Plan, manage, and execute your projects efficiently.",
	},
	{
		id: "c7xkew",
		name: "Search Engines",
		slug: "search-engines",
		image_url: "https://example.com/images/search.png",
		icon_svg: sharedIcon,
		description: "Search infrastructure and custom indexing tools.",
	},
	{
		id: "cn0vzt",
		name: "Security & Privacy",
		slug: "security-privacy",
		image_url: "https://example.com/images/security.png",
		icon_svg: sharedIcon,
		description: "Encrypt, protect, and stay private online.",
	},
	{
		id: "cf43vz",
		name: "Customer Support",
		slug: "customer-support",
		image_url: "https://example.com/images/support.png",
		icon_svg: sharedIcon,
		description: "Helpdesk, chatbots, and ticketing systems.",
	},
	{
		id: "czp6da",
		name: "Gaming",
		slug: "gaming",
		image_url: "https://example.com/images/gaming.png",
		icon_svg: sharedIcon,
		description: "Game engines, dev tools, and mods for gamers.",
	},
]

const toolsData = [
	// AI Tools
	{
		id: "tool_chatgpt",
		name: "ChatGPT",
		subtitle: "Conversational AI assistant for various tasks",
		slug: "chatgpt",
		imageUrl: "https://example.com/images/chatgpt.png",
		description:
			"OpenAI's powerful conversational AI that can help with writing, coding, analysis, and creative tasks.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_midjourney",
		name: "Midjourney",
		subtitle: "AI-powered image generation from text prompts",
		slug: "midjourney",
		imageUrl: "https://example.com/images/midjourney.png",
		description:
			"Create stunning, artistic images from text descriptions using advanced AI technology.",
		pricing: "subscription" as const,
		status: "approved" as const,
	},
	{
		id: "tool_github_copilot",
		name: "GitHub Copilot",
		subtitle: "AI pair programmer for code completion",
		slug: "github-copilot",
		imageUrl: "https://example.com/images/copilot.png",
		description:
			"AI-powered code completion and suggestions directly in your IDE.",
		pricing: "subscription" as const,
		status: "approved" as const,
	},

	// Developer Tools
	{
		id: "tool_vscode",
		name: "Visual Studio Code",
		subtitle: "Free, powerful code editor with extensions",
		slug: "visual-studio-code",
		imageUrl: "https://example.com/images/vscode.png",
		description:
			"Microsoft's free, open-source code editor with rich ecosystem of extensions.",
		pricing: "free" as const,
		status: "approved" as const,
	},
	{
		id: "tool_docker",
		name: "Docker",
		subtitle: "Containerization platform for applications",
		slug: "docker",
		imageUrl: "https://example.com/images/docker.png",
		description:
			"Package applications into containers for consistent deployment across environments.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_postman",
		name: "Postman",
		subtitle: "API development and testing platform",
		slug: "postman",
		imageUrl: "https://example.com/images/postman.png",
		description:
			"Complete platform for API development, testing, and collaboration.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},

	// Design Tools
	{
		id: "tool_figma",
		name: "Figma",
		subtitle: "Collaborative interface design tool",
		slug: "figma",
		imageUrl: "https://example.com/images/figma.png",
		description:
			"Cloud-based design tool for UI/UX design with real-time collaboration.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_canva",
		name: "Canva",
		subtitle: "Easy-to-use graphic design platform",
		slug: "canva",
		imageUrl: "https://example.com/images/canva.png",
		description:
			"Create professional designs with drag-and-drop simplicity and thousands of templates.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_adobe_xd",
		name: "Adobe XD",
		subtitle: "User experience design and prototyping",
		slug: "adobe-xd",
		imageUrl: "https://example.com/images/adobe-xd.png",
		description:
			"Design and prototype user experiences for web and mobile applications.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},

	// Productivity Tools
	{
		id: "tool_notion",
		name: "Notion",
		subtitle: "All-in-one workspace for notes and collaboration",
		slug: "notion",
		imageUrl: "https://example.com/images/notion.png",
		description:
			"Combine notes, tasks, wikis, and databases in one collaborative workspace.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_slack",
		name: "Slack",
		subtitle: "Team communication and collaboration platform",
		slug: "slack",
		imageUrl: "https://example.com/images/slack.png",
		description:
			"Streamline team communication with channels, direct messages, and integrations.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_todoist",
		name: "Todoist",
		subtitle: "Task management and productivity app",
		slug: "todoist",
		imageUrl: "https://example.com/images/todoist.png",
		description:
			"Organize tasks and projects with natural language processing and smart scheduling.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},

	// Marketing Tools
	{
		id: "tool_mailchimp",
		name: "Mailchimp",
		subtitle: "Email marketing and automation platform",
		slug: "mailchimp",
		imageUrl: "https://example.com/images/mailchimp.png",
		description:
			"Create, send, and analyze email campaigns with advanced automation features.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_hubspot",
		name: "HubSpot",
		subtitle: "Inbound marketing and sales platform",
		slug: "hubspot",
		imageUrl: "https://example.com/images/hubspot.png",
		description:
			"Complete platform for marketing, sales, and customer service automation.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_buffer",
		name: "Buffer",
		subtitle: "Social media management and scheduling",
		slug: "buffer",
		imageUrl: "https://example.com/images/buffer.png",
		description:
			"Schedule, publish, and analyze social media content across multiple platforms.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},

	// No-Code Tools
	{
		id: "tool_webflow",
		name: "Webflow",
		subtitle: "Visual web development platform",
		slug: "webflow",
		imageUrl: "https://example.com/images/webflow.png",
		description:
			"Design, build, and launch responsive websites without writing code.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_zapier",
		name: "Zapier",
		subtitle: "Workflow automation between apps",
		slug: "zapier",
		imageUrl: "https://example.com/images/zapier.png",
		description:
			"Connect and automate workflows between thousands of apps without coding.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_airtable",
		name: "Airtable",
		subtitle: "Flexible database and project management",
		slug: "airtable",
		imageUrl: "https://example.com/images/airtable.png",
		description:
			"Combine the simplicity of a spreadsheet with the power of a database.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},

	// Video & Animation Tools
	{
		id: "tool_loom",
		name: "Loom",
		subtitle: "Screen recording and video messaging",
		slug: "loom",
		imageUrl: "https://example.com/images/loom.png",
		description:
			"Record your screen and camera to create instant video messages.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_after_effects",
		name: "After Effects",
		subtitle: "Motion graphics and visual effects",
		slug: "after-effects",
		imageUrl: "https://example.com/images/after-effects.png",
		description:
			"Industry-standard software for motion graphics, visual effects, and compositing.",
		pricing: "subscription" as const,
		status: "approved" as const,
	},

	// Analytics Tools
	{
		id: "tool_google_analytics",
		name: "Google Analytics",
		subtitle: "Web analytics and reporting platform",
		slug: "google-analytics",
		imageUrl: "https://example.com/images/google-analytics.png",
		description:
			"Track and analyze website traffic, user behavior, and conversion metrics.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
	{
		id: "tool_mixpanel",
		name: "Mixpanel",
		subtitle: "Product analytics and user tracking",
		slug: "mixpanel",
		imageUrl: "https://example.com/images/mixpanel.png",
		description:
			"Track user interactions and analyze product usage with event-based analytics.",
		pricing: "freemium" as const,
		status: "approved" as const,
	},
]

// Tool-Category relationships
const toolCategoryRelations = [
	// AI Tools category
	{ toolId: "tool_chatgpt", categoryId: "c93x0a" },
	{ toolId: "tool_midjourney", categoryId: "c93x0a" },
	{ toolId: "tool_github_copilot", categoryId: "c93x0a" },

	// Developer Tools category
	{ toolId: "tool_vscode", categoryId: "c1k9ez" },
	{ toolId: "tool_docker", categoryId: "c1k9ez" },
	{ toolId: "tool_postman", categoryId: "c1k9ez" },
	{ toolId: "tool_github_copilot", categoryId: "c1k9ez" }, // Cross-category

	// Design category
	{ toolId: "tool_figma", categoryId: "c3plmz" },
	{ toolId: "tool_canva", categoryId: "c3plmz" },
	{ toolId: "tool_adobe_xd", categoryId: "c3plmz" },

	// Productivity category
	{ toolId: "tool_notion", categoryId: "c85qtw" },
	{ toolId: "tool_slack", categoryId: "c85qtw" },
	{ toolId: "tool_todoist", categoryId: "c85qtw" },

	// Marketing category
	{ toolId: "tool_mailchimp", categoryId: "c4drx8" },
	{ toolId: "tool_hubspot", categoryId: "c4drx8" },
	{ toolId: "tool_buffer", categoryId: "c4drx8" },

	// No-Code category
	{ toolId: "tool_webflow", categoryId: "c0k9lm" },
	{ toolId: "tool_zapier", categoryId: "c0k9lm" },
	{ toolId: "tool_airtable", categoryId: "c0k9lm" },

	// Video & Animation category
	{ toolId: "tool_loom", categoryId: "c2mqxe" },
	{ toolId: "tool_after_effects", categoryId: "c2mqxe" },

	// Analytics category
	{ toolId: "tool_google_analytics", categoryId: "cyz3r4" },
	{ toolId: "tool_mixpanel", categoryId: "cyz3r4" },

	// Cross-category relationships
	{ toolId: "tool_notion", categoryId: "cpl4na" }, // Also Project Management
	{ toolId: "tool_slack", categoryId: "cf43vz" }, // Also Customer Support
	{ toolId: "tool_hubspot", categoryId: "cf43vz" }, // Also Customer Support
	{ toolId: "tool_zapier", categoryId: "c85qtw" }, // Also Productivity
	{ toolId: "tool_canva", categoryId: "c4drx8" }, // Also Marketing
]

async function seed() {
	try {
		console.log("🌱 Seeding categories...")
		await db.insert(categories).values(categoryData)
		console.log("✅ Categories seeded!")

		console.log("🛠️ Seeding tools...")
		await db.insert(tools).values(toolsData)
		console.log("✅ Tools seeded!")

		console.log("🔗 Seeding tool-category relationships...")
		await db.insert(toolCategories).values(toolCategoryRelations)
		console.log("✅ Tool-category relationships seeded!")

		console.log("🎉 All seeding completed successfully!")
	} catch (error) {
		console.error("❌ Seeding failed:", error)
	}
}

seed()
