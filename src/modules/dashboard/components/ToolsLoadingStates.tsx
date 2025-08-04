/**
 * @fileoverview Dashboard Loading States - Skeleton Components
 *
 * Professional loading skeleton components for the dashboard with:
 * - Grid and list view skeletons
 * - Dashboard statistics skeletons
 * - Responsive design patterns
 * - Consistent animation timing
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { ProductGrid } from "@/components/ui/responsive-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ToolsGridSkeletonProps } from "../types"

// =============================================================================
// TOOLS GRID SKELETON
/**
 * Renders a set of loading skeleton cards for tools in either grid or list view.
 *
 * Displays a configurable number of animated skeleton placeholders using the appropriate layout for the specified view. Defaults to 8 items for grid view and 6 for list view if `count` is not provided.
 *
 * @param view - Determines the layout style ("grid" or "list") for the skeleton cards.
 * @param count - Optional number of skeleton items to render.
 */

export function ToolsGridSkeleton({ view, count }: ToolsGridSkeletonProps) {
	const skeletonCount = count || (view === "grid" ? 8 : 6)

	return (
		<ProductGrid cardType={view === "grid" ? "vertical" : "horizontal"}>
			{Array.from({ length: skeletonCount }).map((_, index) => (
				<div
					key={index}
					className={cn(
						"rounded-[28px] overflow-hidden bg-surface-container animate-pulse",
						view === "list" && "flex gap-4 p-4"
					)}
				>
					{view === "grid" ? <GridSkeletonItem /> : <ListSkeletonItem />}
				</div>
			))}
		</ProductGrid>
	)
}

// =============================================================================
// GRID SKELETON ITEM
/**
 * Renders a loading skeleton placeholder for a grid-style card.
 *
 * Displays an animated image skeleton and multiple content bars to simulate a card's layout during loading in grid view.
 */

function GridSkeletonItem() {
	return (
		<>
			{/* Image skeleton */}
			<div className="w-full p-2">
				<Skeleton className="aspect-video w-full rounded-[20px]" />
			</div>
			{/* Content skeleton */}
			<div className="p-4 space-y-3">
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
				<div className="flex gap-2 pt-2">
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-8 w-20" />
				</div>
			</div>
		</>
	)
}

// =============================================================================
// LIST SKELETON ITEM
/**
 * Renders a skeleton placeholder for a single list view item in a dashboard.
 *
 * Displays an image skeleton on the left and stacked skeleton bars on the right to simulate loading content and actions.
 */

function ListSkeletonItem() {
	return (
		<>
			<Skeleton className="w-32 h-24 rounded-lg" />
			<div className="flex-1 space-y-2">
				<Skeleton className="h-6 w-2/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<div className="flex gap-2 pt-2">
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-16" />
				</div>
			</div>
		</>
	)
}

// =============================================================================
// DASHBOARD STATS SKELETON
/**
 * Renders a responsive grid of four skeleton cards representing loading states for dashboard statistics.
 *
 * Each card displays animated placeholders for a label, value, and icon, providing visual feedback while data is loading.
 */

export function DashboardStatsSkeleton() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className="bg-card rounded-lg p-4 border"
				>
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-8 w-12" />
						</div>
						<Skeleton className="h-5 w-5 rounded" />
					</div>
				</div>
			))}
		</div>
	)
}
