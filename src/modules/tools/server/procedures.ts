import { db } from "@/db/db"
import {
	categories,
	platforms,
	tags,
	toolCategories,
	toolPlatforms,
	toolTags,
	tools,
} from "@/db/schema"
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/defaults"
import {
	baseProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm"
import { z } from "zod"

// =============================================================================
// INPUT SCHEMAS
// =============================================================================

const getAllToolsInputSchema = z.object({
	// Pagination
	page: z.number().min(1).default(DEFAULT_PAGE),
	pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(20), // 20 items per page as requested

	// Search
	search: z.string().optional(),

	// Filters
	status: z
		.enum(["all", "draft", "pending_review", "approved", "rejected"])
		.default("approved"), // Only show approved tools by default

	pricing: z
		.enum([
			"all",
			"free",
			"free open source",
			"paid",
			"freemium",
			"subscription",
			"one-time",
		])
		.optional(),

	categories: z.array(z.string()).optional(), // Category IDs
	platforms: z.array(z.string()).optional(), // Platform IDs
	tags: z.array(z.string()).optional(), // Tag IDs

	// Sorting
	sortBy: z
		.enum(["name", "createdAt", "updatedAt", "pricing"])
		.default("createdAt"),
	sortDirection: z.enum(["asc", "desc"]).default("desc"),

	// Additional filters
	featured: z.boolean().optional(),
	hasImage: z.boolean().optional(),
})

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Build dynamic WHERE clause based on filters
 */
function buildWhereClause(input: z.infer<typeof getAllToolsInputSchema>) {
	const conditions = []

	// Status filter
	if (input.status !== "all") {
		conditions.push(eq(tools.status, input.status))
	}

	// Pricing filter
	if (input.pricing && input.pricing !== "all") {
		conditions.push(eq(tools.pricing, input.pricing))
	}

	// Search filter - search in name, subtitle, and description
	if (input.search) {
		const searchTerm = `%${input.search}%`
		conditions.push(
			or(
				ilike(tools.name, searchTerm),
				ilike(tools.subtitle, searchTerm),
				ilike(tools.description, searchTerm)
			)
		)
	}

	// Image filter
	if (input.hasImage) {
		conditions.push(
			sql`${tools.imageUrl} IS NOT NULL AND ${tools.imageUrl} != ''`
		)
	}

	return conditions.length > 0 ? and(...conditions) : undefined
}

/**
 * Build ORDER BY clause
 */
function buildOrderBy(sortBy: string, sortDirection: "asc" | "desc") {
	const direction = sortDirection === "asc" ? asc : desc

	switch (sortBy) {
		case "name":
			return [direction(tools.name)]
		case "updatedAt":
			return [direction(tools.updatedAt)]
		case "pricing":
			return [direction(tools.pricing)]
		case "createdAt":
		default:
			return [direction(tools.createdAt)]
	}
}

// =============================================================================
// PROCEDURES
// =============================================================================

export const toolsProcedure = createTRPCRouter({
	/**
	 * Get all tools with comprehensive filtering, search, and pagination
	 * Perfect for dashboard views with infinite scrolling or regular pagination
	 */
	getAllTools: baseProcedure
		.input(getAllToolsInputSchema)
		.query(async ({ input }) => {
			try {
				// Build base query conditions
				const whereClause = buildWhereClause(input)
				const orderBy = buildOrderBy(input.sortBy, input.sortDirection)

				// Calculate offset for pagination
				const offset = (input.page - 1) * input.pageSize

				// Base query for tools with relationships
				let query = db
					.select({
						id: tools.id,
						name: tools.name,
						subtitle: tools.subtitle,
						slug: tools.slug,
						imageUrl: tools.imageUrl,
						description: tools.description,
						pricing: tools.pricing,
						status: tools.status,
						createdAt: tools.createdAt,
						updatedAt: tools.updatedAt,
					})
					.from(tools)

				// Add category filter if specified
				if (input.categories && input.categories.length > 0) {
					query = query
						.innerJoin(toolCategories, eq(toolCategories.toolId, tools.id))
						.where(
							and(
								whereClause,
								inArray(toolCategories.categoryId, input.categories)
							)
						) as any
				}
				// Add platform filter if specified
				else if (input.platforms && input.platforms.length > 0) {
					query = query
						.innerJoin(toolPlatforms, eq(toolPlatforms.toolId, tools.id))
						.where(
							and(
								whereClause,
								inArray(toolPlatforms.platformId, input.platforms)
							)
						) as any
				}
				// Add tag filter if specified
				else if (input.tags && input.tags.length > 0) {
					query = query
						.innerJoin(toolTags, eq(toolTags.toolId, tools.id))
						.where(and(whereClause, inArray(toolTags.tagId, input.tags))) as any
				}
				// No join filters, just apply where clause
				else if (whereClause) {
					query = query.where(whereClause) as any
				}

				// Apply ordering, pagination
				const data = await query
					.orderBy(...orderBy)
					.limit(input.pageSize)
					.offset(offset)

				// Get total count for pagination metadata
				let countQuery = db
					.select({ count: sql<number>`COUNT(DISTINCT ${tools.id})::int` })
					.from(tools)

				// Apply same filters to count query
				if (input.categories && input.categories.length > 0) {
					countQuery = countQuery
						.innerJoin(toolCategories, eq(toolCategories.toolId, tools.id))
						.where(
							and(
								whereClause,
								inArray(toolCategories.categoryId, input.categories)
							)
						) as any
				} else if (input.platforms && input.platforms.length > 0) {
					countQuery = countQuery
						.innerJoin(toolPlatforms, eq(toolPlatforms.toolId, tools.id))
						.where(
							and(
								whereClause,
								inArray(toolPlatforms.platformId, input.platforms)
							)
						) as any
				} else if (input.tags && input.tags.length > 0) {
					countQuery = countQuery
						.innerJoin(toolTags, eq(toolTags.toolId, tools.id))
						.where(and(whereClause, inArray(toolTags.tagId, input.tags))) as any
				} else if (whereClause) {
					countQuery = countQuery.where(whereClause) as any
				}

				const [{ count: totalCount }] = await countQuery

				// Calculate pagination metadata
				const totalPages = Math.ceil(totalCount / input.pageSize)
				const hasNextPage = input.page < totalPages
				const hasPreviousPage = input.page > 1

				return {
					items: data,
					meta: {
						total: totalCount,
						totalPages,
						page: input.page,
						pageSize: input.pageSize,
						hasNextPage,
						hasPreviousPage,
					},
				}
			} catch (error) {
				console.error("Error fetching tools:", error)
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to fetch tools. Please try again later.",
				})
			}
		}),

	/**
	 * Get filter options for dropdowns
	 * Returns available categories, platforms, and tags for filtering UI
	 */
	getFilterOptions: baseProcedure.query(async () => {
		try {
			const [categoriesData, platformsData, tagsData] = await Promise.all([
				// Get categories with tool counts
				db
					.select({
						id: categories.id,
						name: categories.name,
						slug: categories.slug,
						toolCount: sql<number>`COUNT(${toolCategories.toolId})::int`,
					})
					.from(categories)
					.leftJoin(
						toolCategories,
						eq(toolCategories.categoryId, categories.id)
					)
					.leftJoin(
						tools,
						and(
							eq(tools.id, toolCategories.toolId),
							eq(tools.status, "approved")
						)
					)
					.groupBy(categories.id)
					.having(sql`COUNT(${toolCategories.toolId}) > 0`)
					.orderBy(categories.name),

				// Get platforms with tool counts
				db
					.select({
						id: platforms.id,
						name: platforms.name,
						slug: platforms.slug,
						toolCount: sql<number>`COUNT(${toolPlatforms.toolId})::int`,
					})
					.from(platforms)
					.leftJoin(toolPlatforms, eq(toolPlatforms.platformId, platforms.id))
					.leftJoin(
						tools,
						and(
							eq(tools.id, toolPlatforms.toolId),
							eq(tools.status, "approved")
						)
					)
					.groupBy(platforms.id)
					.having(sql`COUNT(${toolPlatforms.toolId}) > 0`)
					.orderBy(platforms.name),

				// Get tags with tool counts
				db
					.select({
						id: tags.id,
						name: tags.name,
						slug: tags.slug,
						color: tags.color,
						toolCount: sql<number>`COUNT(${toolTags.toolId})::int`,
					})
					.from(tags)
					.leftJoin(toolTags, eq(toolTags.tagId, tags.id))
					.leftJoin(
						tools,
						and(eq(tools.id, toolTags.toolId), eq(tools.status, "approved"))
					)
					.groupBy(tags.id)
					.having(sql`COUNT(${toolTags.toolId}) > 0`)
					.orderBy(desc(sql`COUNT(${toolTags.toolId})`)),
			])

			return {
				categories: categoriesData,
				platforms: platformsData,
				tags: tagsData,
			}
		} catch (error) {
			console.error("Error fetching filter options:", error)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to fetch filter options.",
			})
		}
	}),

	/**
	 * Get tools statistics for dashboard
	 */
	getToolsStats: baseProcedure.query(async () => {
		try {
			const [statsResult] = await db
				.select({
					total: sql<number>`COUNT(*)::int`,
					approved: sql<number>`COUNT(CASE WHEN ${tools.status} = 'approved' THEN 1 END)::int`,
					draft: sql<number>`COUNT(CASE WHEN ${tools.status} = 'draft' THEN 1 END)::int`,
					pendingReview: sql<number>`COUNT(CASE WHEN ${tools.status} = 'pending_review' THEN 1 END)::int`,
					free: sql<number>`COUNT(CASE WHEN ${tools.pricing} = 'free' THEN 1 END)::int`,
					paid: sql<number>`COUNT(CASE WHEN ${tools.pricing} IN ('paid', 'subscription', 'one-time') THEN 1 END)::int`,
					freemium: sql<number>`COUNT(CASE WHEN ${tools.pricing} = 'freemium' THEN 1 END)::int`,
				})
				.from(tools)

			return statsResult
		} catch (error) {
			console.error("Error fetching tools stats:", error)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to fetch tools statistics.",
			})
		}
	}),
})

export type ToolsProcedure = typeof toolsProcedure
