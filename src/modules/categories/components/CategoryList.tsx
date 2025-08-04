/**
 * @fileoverview Category List Component - Server-Side Data Integration
 *
 * This component demonstrates professional integration between URL state management
 * and server-side data fetching using TRPC. It showcases:
 * - Type-safe API integration with URL parameters
 * - Optimistic loading states and error handling
 * - Responsive grid layouts based on view mode
 * - SEO-friendly server-side rendering
 * - Performance optimizations with proper caching
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { trpc } from "@/lib/trpc"
import {
	CategorySearchParamsType,
	type ViewMode,
} from "@/modules/categories/params"
import { CategoryCard } from "./CategoryCard"
import { CategoryCompactView } from "./CategoryCompactView"
import { CategoryListView } from "./CategoryListView"
import { EmptyState } from "./EmptyState"
import { ErrorState } from "./ErrorState"

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for the CategoryList component
 */
interface CategoryListProps {
	/** Parsed and validated search parameters from URL */
	searchParams: CategorySearchParamsType
	/** Current view mode for rendering */
	viewMode: ViewMode
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * CategoryList - Server-Side Data Integration Component
 *
 * This component demonstrates how to integrate URL-based state management
 * with server-side data fetching and rendering. Key features:
 *
 * 1. **Type-Safe API Integration**: Uses TRPC with full TypeScript support
 * 2. **Server-Side Rendering**: Renders on server for SEO and performance
 * 3. **Error Boundaries**: Graceful error handling and user feedback
 * 4. **Responsive Design**: Adapts to different view modes and screen sizes
 * 5. **Performance Optimized**: Efficient data fetching and caching
 *
 * @param props - Component props containing search parameters and view mode
 * @returns Promise<JSX.Element> - Server-rendered category list
 */
export async function CategoryList({
	searchParams,
	viewMode,
}: CategoryListProps) {
	try {
		// ==========================================================================
		// SERVER-SIDE DATA FETCHING
		// ==========================================================================

		/**
		 * Fetch categories using TRPC with URL parameters
		 * This happens on the server, providing immediate data for SSR
		 */
		const categoriesData = await trpc.categories.getManyForSidebar.query({
			page: searchParams.page,
			pageSize: searchParams.pageSize,
			// Add additional filters based on URL parameters
			// Note: You'll need to extend your TRPC procedure to handle these filters
		})

		/**
		 * Transform API response for component consumption
		 * This ensures consistent data structure across different API versions
		 */
		const {
			items: categories,
			meta: { total, totalPages, page, pageSize },
		} = categoriesData

		// ==========================================================================
		// EMPTY STATE HANDLING
		// ==========================================================================

		/**
		 * Show empty state when no categories match current filters
		 * Provides helpful messaging and clear action buttons
		 */
		if (!categories || categories.length === 0) {
			return (
				<EmptyState
					title="No categories found"
					description={
						searchParams.search
							? `No categories match "${searchParams.search}". Try adjusting your search or filters.`
							: "No categories are available at the moment."
					}
					action={
						searchParams.search
							? {
									label: "Clear search",
									href: "/categories",
							  }
							: {
									label: "Refresh page",
									href: "/categories",
							  }
					}
				/>
			)
		}

		// ==========================================================================
		// VIEW MODE RENDERING
		// ==========================================================================

		/**
		 * Render categories based on selected view mode
		 * Each view mode provides different information density and layout
		 */
		const renderCategories = () => {
			switch (viewMode) {
				case "grid":
					return (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories.map((category) => (
								<CategoryCard
									key={category.id}
									category={category}
									searchTerm={searchParams.search}
								/>
							))}
						</div>
					)

				case "list":
					return (
						<div className="space-y-4">
							{categories.map((category) => (
								<CategoryListView
									key={category.id}
									category={category}
									searchTerm={searchParams.search}
								/>
							))}
						</div>
					)

				case "compact":
					return (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
							{categories.map((category) => (
								<CategoryCompactView
									key={category.id}
									category={category}
									searchTerm={searchParams.search}
								/>
							))}
						</div>
					)

				default:
					return (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories.map((category) => (
								<CategoryCard
									key={category.id}
									category={category}
									searchTerm={searchParams.search}
								/>
							))}
						</div>
					)
			}
		}

		// ==========================================================================
		// MAIN RENDER
		// ==========================================================================

		return (
			<div className="space-y-6">
				{/* Results Summary */}
				<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
					<span>
						Showing {(page - 1) * pageSize + 1}-
						{Math.min(page * pageSize, total)} of {total} categories
					</span>

					{searchParams.search && (
						<span>Search results for "{searchParams.search}"</span>
					)}
				</div>

				{/* Category Grid/List */}
				<div className="min-h-[400px]">{renderCategories()}</div>

				{/* Pagination Info */}
				{totalPages > 1 && (
					<div className="text-center text-sm text-gray-500">
						Page {page} of {totalPages}
					</div>
				)}
			</div>
		)
	} catch (error) {
		// ==========================================================================
		// ERROR HANDLING
		// ==========================================================================

		/**
		 * Comprehensive error handling with user-friendly messages
		 * Logs detailed errors for debugging while showing clean UI to users
		 */
		console.error("Error fetching categories:", error)

		return (
			<ErrorState
				title="Unable to load categories"
				description="There was a problem loading the categories. Please try again later."
				error={error instanceof Error ? error.message : "Unknown error"}
				action={{
					label: "Try again",
					href: "/categories",
				}}
			/>
		)
	}
}
