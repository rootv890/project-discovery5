import page from "@/app/(dashboard)/page"
import { db } from "@/db/db"
import { categories } from "@/db/schema"
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/defaults"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { sql } from "drizzle-orm"
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
	getManyForSidebar: protectedProcedure
		.input(getManyInputSchema)
		.query(async (opts) => {
			const { ctx, input } = opts
			if (!ctx.auth.session) {
				// If the user is not authenticated, throw an error
				throw new Error("You must be logged in to view categories.")
			}
			const whereClause = undefined // Define your where clause logic here if needed

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
})
