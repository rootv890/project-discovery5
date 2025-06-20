import {
	// Core
	tools as toolsTable,
	categories as categoriesTable,
	platforms as platformsTable,
	tags as tagsTable,

	// Joint tables
	toolCategories,
	toolTags,
	toolPlatforms,

	// Types
	type InsertToolType,
	type InsertCategoryType,
	type InsertPlatformType,
	type InsertTagType,
	type InsertToolCategoryType,
	type InsertToolTagType,
	type InsertToolPlatformType,
} from "@/db/schema"
import { db } from "@/db/db"
// STEP 1: Base data (without hardcoded IDs)
const toolsData: Omit<InsertToolType, "id">[] = [
	{
		name: "Figma",
		description: "Figma is a vector graphics editor and prototyping tool.",
		slug: "figma",
		imageUrl: "https://cdn.sanity.io/images/599r6htc/.../figma.svg",
		json: {
			features: ["Vector editing", "Prototyping", "Collaboration"],
			website: "https://figma.com",
		},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		name: "Adobe XD",
		description: "Adobe XD is a vector-based design tool.",
		slug: "adobe-xd",
		imageUrl: "https://upload.wikimedia.org/.../Adobe_XD_CC_icon.svg",
		json: {
			features: ["Wireframing", "Prototyping", "Collaboration"],
			website: "https://adobe.com/products/xd.html",
		},
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

const categoriesData: Omit<InsertCategoryType, "id">[] = [
	{
		name: "UI/UX Design",
		slug: "ui-ux-design",
		description: "All about user interfaces and experiences.",
		imageUrl: "https://cdn.sanity.io/images/.../uiux.png",
		json: {},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		name: "Prototyping",
		slug: "prototyping",
		description: "Build interactive design ideas before development.",
		imageUrl: "https://cdn.sanity.io/images/.../proto.png",
		json: {},
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

const platformsData: Omit<InsertPlatformType, "id">[] = [
	{
		name: "Web",
		slug: "web",
		description: "Browser-based apps.",
		imageUrl: "https://cdn.sanity.io/images/.../web.png",
		json: {},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		name: "Desktop",
		slug: "desktop",
		description: "Native desktop apps.",
		imageUrl: "https://cdn.sanity.io/images/.../desktop.png",
		json: {},
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

const tagsData: InsertTagType[] = [
	{
		name: "Design",
		slug: "design",
		color: "#FFB300",
		description: "Design-related content",
		usageCount: 0,
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		name: "Collaboration",
		slug: "collaboration",
		color: "#2196F3",
		description: "Tools for teamwork",
		usageCount: 0,
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

async function seed() {
	// 1. Insert base tables
	await db.insert(categoriesTable).values(categoriesData)
	await db.insert(platformsTable).values(platformsData)
	await db.insert(tagsTable).values(tagsData)
	await db.insert(toolsTable).values(toolsData)

	// 2. Fetch actual IDs
	const tools = await db.select().from(toolsTable)
	const categories = await db.select().from(categoriesTable)
	const platforms = await db.select().from(platformsTable)
	const tags = await db.select().from(tagsTable)

	// 3. Map relationshipsally
	const toolCategoriesData: InsertToolCategoryType[] = [
		{
			toolId: tools.find((t) => t.slug === "figma")!.id,
			categoryId: categories.find((c) => c.slug === "ui-ux-design")!.id,
		},
		{
			toolId: tools.find((t) => t.slug === "figma")!.id,
			categoryId: categories.find((c) => c.slug === "prototyping")!.id,
		},
		{
			toolId: tools.find((t) => t.slug === "adobe-xd")!.id,
			categoryId: categories.find((c) => c.slug === "ui-ux-design")!.id,
		},
	]

	const toolTagsData: InsertToolTagType[] = [
		{
			toolId: tools.find((t) => t.slug === "figma")!.id,
			tagId: tags.find((tag) => tag.slug === "design")!.id,
		},
		{
			toolId: tools.find((t) => t.slug === "adobe-xd")!.id,
			tagId: tags.find((tag) => tag.slug === "collaboration")!.id,
		},
	]

	const toolPlatformsData: InsertToolPlatformType[] = [
		{
			toolId: tools.find((t) => t.slug === "figma")!.id,
			platformId: platforms.find((p) => p.slug === "web")!.id,
		},
		{
			toolId: tools.find((t) => t.slug === "adobe-xd")!.id,
			platformId: platforms.find((p) => p.slug === "desktop")!.id,
		},
	]

	// 4. Insert join tables
	await db.insert(toolCategories).values(toolCategoriesData)
	await db.insert(toolTags).values(toolTagsData)
	await db.insert(toolPlatforms).values(toolPlatformsData)

	console.log("✅ Seeded all tables with relations!")
}

if (require.main === module) {
	seed().catch((err) => {
		console.error(err)
		process.exit(1)
	})
}
