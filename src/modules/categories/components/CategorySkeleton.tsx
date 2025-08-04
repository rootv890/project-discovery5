/**
 * @fileoverview Category Skeleton Component - Loading State UI
 *
 * This component provides professional loading states that match different view modes:
 * - Responsive skeleton layouts for grid, list, and compact views
 * - Smooth pulse animations for better perceived performance
 * - Accessible loading indicators for screen readers
 * - Consistent spacing and sizing with actual content
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { cn } from "@/lib/utils"
import { type ViewMode } from "@/modules/categories/params"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface CategorySkeletonProps {
	/** View mode to match skeleton layout */
	viewMode: ViewMode
	/** Number of skeleton items to show */
	count?: number
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Renders a loading skeleton UI for category listings, adapting the layout to match the specified view mode.
 *
 * Displays placeholder elements that visually resemble the actual category content in grid, list, or compact views. Includes accessible ARIA attributes and screen reader text to indicate loading state.
 *
 * @param viewMode - The layout mode for the skeleton ("grid", "list", or "compact")
 * @param count - Optional number of skeleton items to display (defaults to 6)
 */
export function CategorySkeleton({
	viewMode,
	count = 6,
}: CategorySkeletonProps) {
	const skeletonItems = Array.from({ length: count }, (_, i) => i)

	/**
	 * Base skeleton component with pulse animation
	 */
	const SkeletonBox = ({ className, ...props }: { className?: string }) => (
		<div
			className={cn(
				"animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
				className
			)}
			{...props}
		/>
	)

	/**
	 * Grid view skeleton - matches CategoryCard layout
	 */
	const GridSkeleton = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{skeletonItems.map((index) => (
				<div
					key={index}
					className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4"
				>
					{/* Category icon */}
					<SkeletonBox className="w-12 h-12 rounded-lg" />

					{/* Category name */}
					<SkeletonBox className="h-6 w-3/4" />

					{/* Category description */}
					<div className="space-y-2">
						<SkeletonBox className="h-4 w-full" />
						<SkeletonBox className="h-4 w-2/3" />
					</div>

					{/* Tool count and metadata */}
					<div className="flex items-center justify-between">
						<SkeletonBox className="h-4 w-20" />
						<SkeletonBox className="h-4 w-16" />
					</div>

					{/* Action button */}
					<SkeletonBox className="h-9 w-full rounded-md" />
				</div>
			))}
		</div>
	)

	/**
	 * List view skeleton - matches CategoryListView layout
	 */
	const ListSkeleton = () => (
		<div className="space-y-4">
			{skeletonItems.map((index) => (
				<div
					key={index}
					className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
				>
					<div className="flex items-start space-x-4">
						{/* Category icon */}
						<SkeletonBox className="w-16 h-16 rounded-lg flex-shrink-0" />

						<div className="flex-1 space-y-3">
							{/* Category name and metadata */}
							<div className="flex items-center justify-between">
								<SkeletonBox className="h-6 w-48" />
								<SkeletonBox className="h-4 w-24" />
							</div>

							{/* Category description */}
							<div className="space-y-2">
								<SkeletonBox className="h-4 w-full" />
								<SkeletonBox className="h-4 w-4/5" />
								<SkeletonBox className="h-4 w-1/2" />
							</div>

							{/* Tags and tools count */}
							<div className="flex items-center justify-between">
								<div className="flex space-x-2">
									<SkeletonBox className="h-6 w-16 rounded-full" />
									<SkeletonBox className="h-6 w-20 rounded-full" />
									<SkeletonBox className="h-6 w-14 rounded-full" />
								</div>
								<SkeletonBox className="h-8 w-24 rounded-md" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)

	/**
	 * Compact view skeleton - matches CategoryCompactView layout
	 */
	const CompactSkeleton = () => (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
			{skeletonItems.map((index) => (
				<div
					key={index}
					className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-3"
				>
					{/* Category icon */}
					<SkeletonBox className="w-8 h-8 rounded" />

					{/* Category name */}
					<SkeletonBox className="h-5 w-full" />

					{/* Tool count */}
					<SkeletonBox className="h-3 w-16" />
				</div>
			))}
		</div>
	)

	/**
	 * Render appropriate skeleton based on view mode
	 */
	const renderSkeleton = () => {
		switch (viewMode) {
			case "list":
				return <ListSkeleton />
			case "compact":
				return <CompactSkeleton />
			case "grid":
			default:
				return <GridSkeleton />
		}
	}

	return (
		<div
			className="animate-pulse"
			role="status"
			aria-label="Loading categories..."
		>
			{renderSkeleton()}

			{/* Screen reader only loading text */}
			<span className="sr-only">Loading categories, please wait...</span>
		</div>
	)
}
