/**
 * @fileoverview Pagination Component - URL-Synchronized Navigation
 *
 * This component demonstrates professional URL-based pagination:
 * - Smart page navigation with bounds checking
 * - URL synchronization for shareable links
 * - Keyboard navigation support
 * - Mobile-responsive design with adaptive controls
 * - Accessibility features for screen readers
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categorySearchParams } from "@/modules/categories/params"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useQueryStates } from "nuqs"
import { useMemo } from "react"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface PaginationProps {
	/** Total number of items (optional - can be fetched from API) */
	total?: number
	/** Total number of pages (optional - can be calculated) */
	totalPages?: number
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Renders a responsive, accessible pagination control synchronized with URL query parameters.
 *
 * Displays page navigation buttons with smart ellipsis for large page ranges, updates the URL on page changes, and adapts its layout for mobile and desktop. Disables navigation at boundaries and provides ARIA support for screen readers. Returns null if only one page is present.
 *
 * @param total - Optional total number of items to paginate
 * @param totalPages - Optional total number of pages; overrides calculation from `total`
 * @returns The pagination navigation element, or null if pagination is unnecessary
 */
export function Pagination({
	total,
	totalPages: propTotalPages,
}: PaginationProps) {
	const [{ page, pageSize }, setParams] = useQueryStates(categorySearchParams)

	// Calculate total pages if not provided
	const totalPages = propTotalPages || (total ? Math.ceil(total / pageSize) : 1)

	/**
	 * Navigate to specific page with bounds checking
	 */
	const goToPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
			setParams({ page: newPage })
		}
	}

	/**
	 * Navigate to previous page
	 */
	const goToPrevious = () => {
		if (page > 1) {
			setParams({ page: page - 1 })
		}
	}

	/**
	 * Navigate to next page
	 */
	const goToNext = () => {
		if (page < totalPages) {
			setParams({ page: page + 1 })
		}
	}

	/**
	 * Generate smart page number array with ellipsis
	 * Shows: [1] ... [current-1] [current] [current+1] ... [last]
	 */
	const pageNumbers = useMemo(() => {
		const delta = 2 // Number of pages to show around current page
		const range = []
		const rangeWithDots = []

		// Always include first page
		range.push(1)

		// Add pages around current page
		for (
			let i = Math.max(2, page - delta);
			i <= Math.min(totalPages - 1, page + delta);
			i++
		) {
			range.push(i)
		}

		// Always include last page (if not already included)
		if (totalPages > 1) {
			range.push(totalPages)
		}

		// Remove duplicates and sort
		const uniqueRange = [...new Set(range)].sort((a, b) => a - b)

		// Add ellipsis between non-consecutive numbers
		let prev = 0
		for (const current of uniqueRange) {
			if (current - prev > 1) {
				rangeWithDots.push("ellipsis")
			}
			rangeWithDots.push(current)
			prev = current
		}

		return rangeWithDots
	}, [page, totalPages])

	/**
	 * Don't render pagination if there's only one page or no pages
	 */
	if (totalPages <= 1) {
		return null
	}

	return (
		<nav
			className="flex items-center justify-center space-x-2"
			role="navigation"
			aria-label="Pagination Navigation"
		>
			{/* Previous Button */}
			<Button
				variant="outline"
				size="sm"
				onClick={goToPrevious}
				disabled={page <= 1}
				className={cn(
					"flex items-center space-x-1",
					page <= 1 && "opacity-50 cursor-not-allowed"
				)}
				aria-label="Go to previous page"
			>
				<ChevronLeft className="h-4 w-4" />
				<span className="hidden sm:inline">Previous</span>
			</Button>

			{/* Page Numbers */}
			<div className="flex items-center space-x-1">
				{pageNumbers.map((pageNum, index) => {
					if (pageNum === "ellipsis") {
						return (
							<div
								key={`ellipsis-${index}`}
								className="flex items-center justify-center w-10 h-10"
								aria-hidden="true"
							>
								<MoreHorizontal className="h-4 w-4 text-gray-400" />
							</div>
						)
					}

					const isCurrentPage = pageNum === page

					return (
						<Button
							key={pageNum}
							variant={isCurrentPage ? "default" : "outline"}
							size="sm"
							onClick={() => goToPage(pageNum as number)}
							className={cn(
								"w-10 h-10 p-0",
								isCurrentPage && "bg-blue-600 text-white hover:bg-blue-700"
							)}
							aria-label={`Go to page ${pageNum}`}
							aria-current={isCurrentPage ? "page" : undefined}
						>
							{pageNum}
						</Button>
					)
				})}
			</div>

			{/* Next Button */}
			<Button
				variant="outline"
				size="sm"
				onClick={goToNext}
				disabled={page >= totalPages}
				className={cn(
					"flex items-center space-x-1",
					page >= totalPages && "opacity-50 cursor-not-allowed"
				)}
				aria-label="Go to next page"
			>
				<span className="hidden sm:inline">Next</span>
				<ChevronRight className="h-4 w-4" />
			</Button>

			{/* Page Info (Mobile) */}
			<div className="sm:hidden ml-4 text-xs text-gray-500">
				{page} of {totalPages}
			</div>

			{/* Page Info (Desktop) */}
			<div className="hidden sm:flex items-center ml-4 text-sm text-gray-500 dark:text-gray-400">
				Page {page} of {totalPages}
				{total && (
					<span className="ml-2">({total.toLocaleString()} total items)</span>
				)}
			</div>
		</nav>
	)
}
