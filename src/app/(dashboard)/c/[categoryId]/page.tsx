import { CategoryToolsPage } from "@/modules/categories/ui/views"
import { isAuthenticated } from "@/trpc/helpers"
import { HydrateClient, prefetch, trpc } from "@/trpc/server"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
	params: Promise<{ categoryId: string }>
}

const CategoryIdPage = async ({ params }: Props) => {
	const isAuthenticatedUser = await isAuthenticated()
	if (!isAuthenticatedUser) {
		redirect("/auth/enter")
	}

	const { categoryId } = await params

	// Prefetch both queries for optimal performance
	await Promise.all([
		prefetch(
			trpc.categories.getAllToolsInCategory.queryOptions({
				categoryId,
			})
		),
		prefetch(
			trpc.categories.getCategoryById.queryOptions({
				categoryId,
			})
		),
	])

	return (
		<HydrateClient>
			<CategoryToolsPage categoryId={categoryId} />
		</HydrateClient>
	)
}

export default CategoryIdPage
