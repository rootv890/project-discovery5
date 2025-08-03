import DashboardPageView from "@/modules/dashboard/ui/views/dashboard-view"
import { isAuthenticated } from "@/trpc/helpers"
import { HydrateClient, prefetch, trpc } from "@/trpc/server"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
	const isAuthenticatedUser = await isAuthenticated()
	if (!isAuthenticatedUser) {
		redirect("/auth/enter")
	}

	prefetch(trpc.categories.getCategoriesForSidebar.queryOptions())

	return (
		<HydrateClient>
			<DashboardPageView />
		</HydrateClient>
	)
}

export default page
