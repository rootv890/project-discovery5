// This file initializes the tRPC server context and exports helpers for creating routers and procedures.
// It sets up the base tRPC instance, context creation, and avoids exporting ambiguous variables.

import { auth } from "@/auth/auth"
import { initTRPC, TRPCError } from "@trpc/server"
import { headers } from "next/headers"
import { cache } from "react"
export const createTRPCContext = cache(async () => {
	/**
	 * @see: https://trpc.io/docs/server/context
	 */
	return { userId: "user_123" }
})
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	// transformer: superjson,
})
// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

// AUTH/Proteched procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	if (!session) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "UNAUTHORIZED - Please log in to continue.",
		})
	}

	// next Function
	return next({
		ctx: { ...ctx, auth: session },
	})
})
