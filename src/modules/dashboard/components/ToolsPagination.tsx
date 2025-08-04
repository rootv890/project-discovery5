/**
 * @fileoverview Dashboard Tools Pagination Component
 *
 * Professional pagination component with:
 * - Page navigation with first/last buttons
 * - Page size selection
 * - Results summary
 * - Keyboard navigation support
 * - URL state synchronization
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
	dashboardToolsSearchParams,
	type DashboardToolsSearchParamsType,
} from "@/modules/dashboard/params"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import { useQueryStates } from "nuqs"

// =============================================================================
// TYPES
// =============================================================================

interface ToolsPaginationProps {
	totalItems: number
	totalPages: number
	currentPage: number
	pageSize: number
	hasNextPage: boolean
	hasPreviousPage: boolean
	className?: string
}

// =============================================================================
// COMPONENT
/**
 * Renders a pagination UI for dashboard tools, including results summary, page size selection, and navigation controls.
 *
 * Displays the current range of items, allows users to select the number of items per page, and provides navigation buttons for moving between pages. Pagination state is synchronized with URL query parameters for consistent navigation and bookmarking. The component is hidden if there are no items to display.
 *
 * @param totalItems - The total number of items available for pagination.
 * @param totalPages - The total number of pages based on the current page size.
 * @param currentPage - The currently active page number.
 * @param pageSize - The number of items displayed per page.
 * @param hasNextPage - Indicates if there is a next page available.
 * @param hasPreviousPage - Indicates if there is a previous page available.
 * @param className - Optional CSS class for custom styling.
 *
 * @returns The pagination UI component, or `null` if there are no items.
 */

export function ToolsPagination({
	totalItems,
	totalPages,
	currentPage,
	pageSize,
	hasNextPage,
	hasPreviousPage,
	className,
}: ToolsPaginationProps) {
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams, {
		shallow: false,
	})

	// ==========================================================================
	// CALCULATIONS
	// ==========================================================================

	const startItem = (currentPage - 1) * pageSize + 1
	const endItem = Math.min(currentPage * pageSize, totalItems)

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const delta = 2 // Show 2 pages on each side of current page
		const range = []
		const rangeWithDots = []

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i)
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...")
		} else {
			rangeWithDots.push(1)
		}

		rangeWithDots.push(...range)

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages)
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages)
		}

		return rangeWithDots
	}

	// ==========================================================================
	// EVENT HANDLERS
	// ==========================================================================

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setParams({ page })
		}
	}

	const handlePageSizeChange = (newPageSize: string) => {
		setParams({
			pageSize: parseInt(newPageSize),
			page: 1, // Reset to first page when changing page size
		})
	}

	const handleFirstPage = () => handlePageChange(1)
	const handleLastPage = () => handlePageChange(totalPages)
	const handlePreviousPage = () => handlePageChange(currentPage - 1)
	const handleNextPage = () => handlePageChange(currentPage + 1)

	// ==========================================================================
	// RENDER
	// ==========================================================================

	if (totalItems === 0) {
		return null
	}

	return (
		<div
			className={cn(
				"flex flex-col sm:flex-row items-center justify-between gap-4",
				className
			)}
		>
			{/* Results Summary */}
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<span>
					Showing {startItem.toLocaleString()} to {endItem.toLocaleString()} of{" "}
					{totalItems.toLocaleString()} results
				</span>

				{/* Page Size Selector */}
				<div className="flex items-center gap-2">
					<span className="whitespace-nowrap">Show:</span>
					<Select
						value={pageSize.toString()}
						onValueChange={handlePageSizeChange}
					>
						<SelectTrigger className="w-20 h-8">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex items-center gap-1">
					{/* First Page */}
					<Button
						variant="outline"
						size="sm"
						onClick={handleFirstPage}
						disabled={!hasPreviousPage}
						className="h-8 w-8 p-0"
						title="First page"
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>

					{/* Previous Page */}
					<Button
						variant="outline"
						size="sm"
						onClick={handlePreviousPage}
						disabled={!hasPreviousPage}
						className="h-8 w-8 p-0"
						title="Previous page"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{/* Page Numbers */}
					<div className="flex items-center gap-1">
						{getPageNumbers().map((pageNum, index) => {
							if (pageNum === "...") {
								return (
									<span
										key={`dots-${index}`}
										className="px-2 py-1 text-muted-foreground"
									>
										...
									</span>
								)
							}

							const page = pageNum as number
							const isCurrentPage = page === currentPage

							return (
								<Button
									key={page}
									variant={isCurrentPage ? "filled" : "outline"}
									size="sm"
									onClick={() => handlePageChange(page)}
									className={cn(
										"h-8 w-8 p-0",
										isCurrentPage && "pointer-events-none"
									)}
								>
									{page}
								</Button>
							)
						})}
					</div>

					{/* Next Page */}
					<Button
						variant="outline"
						size="sm"
						onClick={handleNextPage}
						disabled={!hasNextPage}
						className="h-8 w-8 p-0"
						title="Next page"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>

					{/* Last Page */}
					<Button
						variant="outline"
						size="sm"
						onClick={handleLastPage}
						disabled={!hasNextPage}
						className="h-8 w-8 p-0"
						title="Last page"
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	)
}
