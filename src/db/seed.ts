import { db } from "@/db/db"
import {
	categories as categoriesTable,
	platforms as platformsTable,
	tags as tagsTable,

	// Joint tables
	toolCategories,
	toolPlatforms,
	// Core
	tools as toolsTable,
	toolTags,
	type InsertCategoryType,
	type InsertPlatformType,
	type InsertTagType,
	type InsertToolCategoryType,
	type InsertToolPlatformType,
	type InsertToolTagType,
	// Types
	type InsertToolType,
} from "@/db/schema"
import { generateId } from "@/lib/utils"
// STEP 1: Base data (without hardcoded IDs)
const toolsData: InsertToolType[] = [
	{
		id: generateId("tool"),
		name: "Figma",
		subtitle: "UI-UX and Prototyping tool",
		description: "Figma is a vector graphics editor and prototyping tool.",
		slug: "figma",
		imageUrl:
			"https://cdn.sanity.io/images/599r6htc/regionalized/4042e8ef7dbe5609613c705bdaf926cf65f6326b-720x720.png?q=75&fit=max&auto=format&dpr=2",
		json: {
			features: ["Vector editing", "Prototyping", "Collaboration"],
			website: "https://figma.com",
		},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		id: generateId("tool"),

		name: "Adobe XD",
		subtitle: "UI-UX Desktop tool by Freaking Adobe",
		description: "Adobe XD is a vector-based design tool.",
		slug: "adobe-xd",
		imageUrl:
			"https://cdn.sanity.io/images/599r6htc/regionalized/83b7a244be9f96d89a858e6663372a51f46cda7d-1560x1248.png?w=780&q=75&fit=max&auto=format&dpr=2",
		json: {
			features: ["Wireframing", "Prototyping", "Collaboration"],
			website: "https://adobe.com/products/xd.html",
		},
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

const categoriesData: InsertCategoryType[] = [
	{
		id: generateId("category"),
		name: "UI/UX Design",
		slug: "ui-ux-design",
		description: "All about user interfaces and experiences.",
		imageUrl: "https://cdn.sanity.io/images/.../uiux.png",
		json: {},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		id: generateId("category"),
		name: "Prototyping",
		slug: "prototyping",
		description: "Build interactive design ideas before development.",
		imageUrl: "https://cdn.sanity.io/images/.../proto.png",
		json: {},
		createdAt: new Date("2024-01-02"),
		updatedAt: new Date("2024-01-02"),
	},
]

const platformsData: InsertPlatformType[] = [
	{
		id: generateId("platform"),
		name: "Web",
		slug: "web",
		description: "Browser-based apps.",
		imageUrl: "https://cdn.sanity.io/images/.../web.png",
		json: {},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		id: generateId("platform"),
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
		id: generateId("tag"),
		name: "Design",
		slug: "design",
		color: "#FFB300",
		description: "Design-related content",
		usageCount: 0,
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-01-01"),
	},
	{
		id: generateId("tag"),
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
			id: generateId("toolCategory"),
			toolId: tools.find((t) => t.slug === "figma")!.id,
			categoryId: categories.find((c) => c.slug === "ui-ux-design")!.id,
		},
		{
			id: generateId("toolCategory"),
			toolId: tools.find((t) => t.slug === "figma")!.id,
			categoryId: categories.find((c) => c.slug === "prototyping")!.id,
		},
		{
			id: generateId("toolCategory"),
			toolId: tools.find((t) => t.slug === "adobe-xd")!.id,
			categoryId: categories.find((c) => c.slug === "ui-ux-design")!.id,
		},
	]

	const toolTagsData: InsertToolTagType[] = [
		{
			id: generateId("toolTag"),
			toolId: tools.find((t) => t.slug === "figma")!.id,
			tagId: tags.find((tag) => tag.slug === "design")!.id,
		},
		{
			id: generateId("toolTag"),
			toolId: tools.find((t) => t.slug === "adobe-xd")!.id,
			tagId: tags.find((tag) => tag.slug === "collaboration")!.id,
		},
	]

	const toolPlatformsData: InsertToolPlatformType[] = [
		{
			id: generateId("toolPlatform"),
			toolId: tools.find((t) => t.slug === "figma")!.id,
			platformId: platforms.find((p) => p.slug === "web")!.id,
		},
		{
			id: generateId("toolPlatform"),
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
