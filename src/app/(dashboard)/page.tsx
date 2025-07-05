import {
	CategoriesSidebarErrorFallback,
	CategoriesSidebarSkeleton,
} from "@/modules/categories/ui/categories-sidebar-fallbacks"
import CategoriesSidebarWrapper from "@/modules/categories/ui/categories-siderbar-wrapper"
import DashboardPageView from "@/modules/dashboard/ui/views/dashboard-view"
import { isAuthenticated } from "@/trpc/helpers"
import { HydrateClient, prefetch, trpc } from "@/trpc/server"
import { redirect } from "next/navigation"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
const page = async () => {
	const isAuthenticatedUser = await isAuthenticated()
	if (!isAuthenticatedUser) {
		redirect("/auth/enter")
	}
	prefetch(trpc.categories.getManyForSidebar.queryOptions({}))

	return (
		<HydrateClient>
			<ErrorBoundary
				fallback={
					<CategoriesSidebarErrorFallback
						error={{
							name: "CategoriesLoadError",
							message: "Failed to load categories. Please try again later.",
						}}
						resetErrorBoundary={() => {
							// Optionally, you can reset the error state or refetch data here
						}}
					/>
				}
			>
				<Suspense fallback={<CategoriesSidebarSkeleton />}>
					<div className="flex size-full relative">
						<CategoriesSidebarWrapper />
						<DashboardPageView />
					</div>
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	)
}

export default page
