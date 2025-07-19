// seed.ts

import { db } from "./db"
import { categories } from "./schema"

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

async function seed() {
	try {
		console.log("🌱 Seeding categories...")
		await db.insert(categories).values(categoryData)
		console.log("✅ Done seeding!")
	} catch (error) {
		console.error("❌ Seeding failed:", error)
	}
}

seed()
