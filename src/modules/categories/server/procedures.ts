import { db } from "@/db/db"
import { categories, toolCategories, tools } from "@/db/schema"
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
import { eq, sql } from "drizzle-orm"
import { Search } from "lucide-react"
import { z } from "zod"

const getManyInputSchema = z.object({
	page: z.number().default(DEFAULT_PAGE),
	pageSize: z
		.number()
		.min(MIN_PAGE_SIZE)
		.max(MAX_PAGE_SIZE)
		.default(DEFAULT_PAGE_SIZE),
})

export const categoriesProcedure = createTRPCRouter({
	// Get Many for Sidebar - using baseProcedure since auth is checked at page level
	getManyForSidebar: baseProcedure
		.input(z.object({}))
		.query(async ({ ctx, input }) => {
			const whereClause = undefined

			// Get categories with actual tool counts using SQL subquery
			const data = await db
				.select({
					id: categories.id,
					name: categories.name,
					slug: categories.slug,
					imageUrl: categories.imageUrl,
					iconSvg: categories.iconSvg,
					description: categories.description,
					createdAt: categories.createdAt,
					updatedAt: categories.updatedAt,
					toolCount: sql<number>`COUNT(${toolCategories.toolId})`.as(
						"toolCount"
					),
				})
				.from(categories)
				.innerJoin(toolCategories, eq(toolCategories.categoryId, categories.id))
				.where(whereClause)
				.groupBy(categories.id)
				.orderBy(sql`${categories.createdAt} DESC`)
			// .offset((input.page - 1) * input.pageSize)
			// .limit(input.pageSize)

			// Get total count of categories
			const [{ count: totalCount }] = await db
				.select({ count: sql<number>`COUNT(*)::int` })
				.from(categories)

			return {
				items: data,
				meta: {
					total: totalCount,
					// totalPages: Math.ceil(totalCount / input.pageSize),
					// page: input.page,
					// pageSize: input.pageSize,
				},
			}
		}),

	getCategoryById: protectedProcedure
		.input(
			z.object({
				categoryId: z.string(),
				page: z.number().default(DEFAULT_PAGE),
				pageSize: z
					.number()
					.min(MIN_PAGE_SIZE)
					.max(MAX_PAGE_SIZE)
					.default(DEFAULT_PAGE_SIZE),
			})
		)
		.query(async ({ ctx, input }) => {
			if (!ctx.auth.session) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to view categories.",
				})
			}

			const whereClause = eq(categories.id, input.categoryId)

			// Get category with related tools and relationships
			const data = await db.query.categories.findFirst({
				where: whereClause,
				with: {
					toolCategories: {
						with: {
							tool: {
								with: {
									platforms: true,
									tags: true,
									categories: true,
									reactions: true,
									creators: true,
								},
							},
						},
						limit: input.pageSize,
					},
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Category not found.",
				})
			}

			// Count total tools in this category
			const totalToolsResult = await db
				.select({ count: db.$count(toolCategories) })
				.from(toolCategories)
				.where(eq(toolCategories.categoryId, input.categoryId))

			const totalTools = Number(totalToolsResult[0]?.count ?? 0)

			return {
				data,
				meta: {
					total: totalTools,
					totalPages: Math.ceil(totalTools / input.pageSize),
					page: input.page,
					pageSize: input.pageSize,
				},
			}
		}),
	getAllToolsInCategory: protectedProcedure
		.input(
			z.object({
				categoryId: z.string(),
				page: z.number().default(DEFAULT_PAGE),
				pageSize: z
					.number()
					.min(MIN_PAGE_SIZE)
					.max(MAX_PAGE_SIZE)
					.default(DEFAULT_PAGE_SIZE),
				orderBy: z
					.object({
						field: z.string().default("createdAt"),
						direction: z.enum(["asc", "desc"]).default("desc"),
					})
					.optional()
					.default({ field: "createdAt", direction: "desc" }),
				limit: z.number().optional(),
				search: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			if (!ctx.auth.session) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to view tools in categories.",
				})
			}

			// get the tool_categorries id from categoryId
			const toolCategoryRecord = await db.query.toolCategories.findFirst({
				where: eq(toolCategories.categoryId, input.categoryId),
			})

			if (!toolCategoryRecord) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message:
						"No tools found for this category. Contact support if you think this is an error.",
				})
			}
			// Todo Build the where clause
			const data = await db.query.toolCategories.findMany({
				where: eq(toolCategories.categoryId, input.categoryId),
				limit: input.limit,
				offset: (input.page - 1) * input.pageSize,
				with: {
					tool: {
						with: {
							platforms: true,
							tags: true,
							categories: true,
							reactions: true,
							creators: true,
						},
					},
				},
				orderBy: (toolCategories, { asc, desc }) => [
					desc(
						// categories.createdAt
						sql`(CASE WHEN ${toolCategories.toolId} = ${toolCategoryRecord.toolId} THEN 1 ELSE 0 END)`
						// toolCategories.createdAt
					),
				],
			})
			if (!data) {
				new TRPCError({
					code: "NOT_FOUND",
					message:
						"No tools found under this category. If you think it is mistake Contact admin",
				})
			}
			const [totalToolsResult] = await db
				.select({ count: db.$count(toolCategories) })
				.from(toolCategories)
				.where(eq(toolCategories.categoryId, input.categoryId))

			const returnObject = {
				data: data,
				meta: {
					total: totalToolsResult.count,
					totalPages: Math.ceil(totalToolsResult.count / input.pageSize),
					page: input.page,
					pageSize: input.pageSize,
				},
			}
			return returnObject
		}),
})
