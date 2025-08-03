import { categoriesProcedure } from "@/modules/categories/server/procedures"
import { toolsProcedure } from "@/modules/tools/server/procedures"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "../init"

export const appRouter = createTRPCRouter({
	categories: categoriesProcedure,
	tools: toolsProcedure,
})

// export type definition of API
export type AppRouter = typeof appRouter
