import { categoriesProcedure } from "@/modules/categories/server/procedures"
import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "../init"
export const appRouter = createTRPCRouter({
	categories: categoriesProcedure,
})
// export type definition of API
export type AppRouter = typeof appRouter
