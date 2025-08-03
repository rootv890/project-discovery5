"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import CategoryToolsView from "./category-tools-view"
import CategoryToolsViewError from "./category-tools-view-error"
import CategoryToolsViewSkeleton from "./category-tools-view-skeleton"

type CategoryToolsPageProps = {
	categoryId: string
}

const CategoryToolsPage = ({ categoryId }: CategoryToolsPageProps) => {
	return (
		<ErrorBoundary
			FallbackComponent={CategoryToolsViewError}
			onError={(error, errorInfo) => {
				// Log error to monitoring service (e.g., Sentry, LogRocket)
				console.error("CategoryToolsPage Error:", error, errorInfo)
			}}
			onReset={() => {
				// Optional: Reset any global state or reload data
				window.location.reload()
			}}
		>
			<Suspense fallback={<CategoryToolsViewSkeleton />}>
				<CategoryToolsView categoryId={categoryId} />
			</Suspense>
		</ErrorBoundary>
	)
}

export default CategoryToolsPage
