import page from "@/app/(dashboard)/page"
import { db } from "@/db/db"
import { categories, toolCategories } from "@/db/schema"
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/defaults"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { eq, sql } from "drizzle-orm"
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
	// Get Many for Sidebar
	getManyForSidebar: protectedProcedure
		.input(getManyInputSchema)
		.query(async (opts) => {
			const { ctx, input } = opts
			if (!ctx.auth.session) {
				// If the user is not authenticated, throw an error
				throw new Error("You must be logged in to view categories.")
			}
			const whereClause = undefined

			const data = await db.query.categories.findMany({
				where: whereClause,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				orderBy: (categories, { desc }) => [desc(categories.createdAt)],
				extras: {
					totalCategories: db.$count(categories).as("total_categories"),
				},
			})

			return {
				items: data,
				meta: {
					total: data.length,
					totalPages: Math.ceil(data.length / input.pageSize),
					page: input.page,
					pageSize: input.pageSize,
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
})
