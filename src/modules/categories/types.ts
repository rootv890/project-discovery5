import { inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@/trpc/routers/_app"
export type getManyForSidebarType =
	inferRouterOutputs<AppRouter>["categories"]["getCategoriesForSidebar"]
export type getCategoryByIdType =
	inferRouterOutputs<AppRouter>["categories"]["getCategoryById"]
