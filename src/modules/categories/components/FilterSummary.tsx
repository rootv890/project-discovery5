/**
 * @fileoverview Filter Summary Component - Active Filters Display
 *
 * This component provides users with a clear overview of active filters:
 * - Visual representation of all active filters
 * - Individual filter removal capabilities
 * - "Clear all" functionality for bulk operations
 * - Responsive design for mobile and desktop
 * - URL synchronization for all filter changes
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	categorySearchParams,
	type CategorySearchParamsType,
} from "@/modules/categories/params"
import { Filter, Search, X } from "lucide-react"
import { useQueryStates } from "nuqs"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface FilterSummaryProps {
	/** Current search parameters from URL */
	params: CategorySearchParamsType
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Displays all currently active category search filters as removable badges and provides controls to clear individual filters or all filters at once.
 *
 * Updates the URL query parameters in sync with filter changes. Renders nothing if no filters are active.
 *
 * @param params - The current category search parameters reflecting active filters
 */
export function FilterSummary({ params }: FilterSummaryProps) {
	const [, setParams] = useQueryStates(categorySearchParams)

	/**
	 * Remove individual filter by setting it back to default
	 */
	const removeFilter = (
		filterKey: keyof CategorySearchParamsType,
		defaultValue: any
	) => {
		setParams({
			[filterKey]: defaultValue,
			page: 1, // Reset pagination when removing filters
		})
	}

	/**
	 * Remove search term
	 */
	const removeSearch = () => removeFilter("search", "")

	/**
	 * Remove status filter
	 */
	const removeStatus = () => removeFilter("status", "all")

	/**
	 * Remove time filter
	 */
	const removeTimeFilter = () => {
		setParams({
			timeFilter: "all",
			dateFrom: "",
			dateTo: "",
			page: 1,
		})
	}

	/**
	 * Remove featured filter
	 */
	const removeFeatured = () => removeFilter("featuredOnly", false)

	/**
	 * Remove has-tools filter
	 */
	const removeHasTools = () => removeFilter("hasToolsOnly", false)

	/**
	 * Remove tool count range
	 */
	const removeToolCountRange = () => {
		setParams({
			minToolCount: 0,
			maxToolCount: 1000,
			page: 1,
		})
	}

	/**
	 * Remove individual tag
	 */
	const removeTag = (tagToRemove: string) => {
		const newTags = params.tags.filter((tag) => tag !== tagToRemove)
		setParams({
			tags: newTags,
			page: 1,
		})
	}

	/**
	 * Clear all filters
	 */
	const clearAllFilters = () => {
		setParams({
			search: "",
			status: "all",
			timeFilter: "all",
			dateFrom: "",
			dateTo: "",
			featuredOnly: false,
			hasToolsOnly: false,
			minToolCount: 0,
			maxToolCount: 1000,
			tags: [],
			page: 1,
		})
	}

	/**
	 * Collect all active filters for display
	 */
	const activeFilters = []

	// Search filter
	if (params.search) {
		activeFilters.push({
			key: "search",
			label: `Search: "${params.search}"`,
			onRemove: removeSearch,
		})
	}

	// Status filter
	if (params.status !== "all") {
		activeFilters.push({
			key: "status",
			label: `Status: ${params.status}`,
			onRemove: removeStatus,
		})
	}

	// Time filter
	if (params.timeFilter !== "all") {
		let timeLabel = `Time: ${params.timeFilter}`
		if (params.timeFilter === "custom" && (params.dateFrom || params.dateTo)) {
			const fromDate = params.dateFrom
				? new Date(params.dateFrom).toLocaleDateString()
				: "start"
			const toDate = params.dateTo
				? new Date(params.dateTo).toLocaleDateString()
				: "end"
			timeLabel = `Date range: ${fromDate} - ${toDate}`
		}

		activeFilters.push({
			key: "timeFilter",
			label: timeLabel,
			onRemove: removeTimeFilter,
		})
	}

	// Feature filters
	if (params.featuredOnly) {
		activeFilters.push({
			key: "featured",
			label: "Featured only",
			onRemove: removeFeatured,
		})
	}

	if (params.hasToolsOnly) {
		activeFilters.push({
			key: "hasTools",
			label: "With tools only",
			onRemove: removeHasTools,
		})
	}

	// Tool count range
	if (params.minToolCount > 0 || params.maxToolCount < 1000) {
		activeFilters.push({
			key: "toolCount",
			label: `Tools: ${params.minToolCount}-${params.maxToolCount}`,
			onRemove: removeToolCountRange,
		})
	}

	// Tags
	params.tags.forEach((tag) => {
		activeFilters.push({
			key: `tag-${tag}`,
			label: `Tag: ${tag}`,
			onRemove: () => removeTag(tag),
		})
	})

	/**
	 * Don't render if no active filters
	 */
	if (activeFilters.length === 0) {
		return null
	}

	return (
		<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
					<span className="text-sm font-medium text-blue-900 dark:text-blue-100">
						Active Filters ({activeFilters.length})
					</span>
				</div>

				<Button
					variant="ghost"
					size="sm"
					onClick={clearAllFilters}
					className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 text-xs"
				>
					Clear all
				</Button>
			</div>

			{/* Filter Tags */}
			<div className="flex flex-wrap gap-2">
				{activeFilters.map(({ key, label, onRemove }) => (
					<Badge
						key={key}
						variant="secondary"
						className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 pr-1"
					>
						<span className="mr-1 text-xs">{label}</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={onRemove}
							className="h-4 w-4 p-0 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
							aria-label={`Remove ${label} filter`}
						>
							<X className="h-3 w-3" />
						</Button>
					</Badge>
				))}
			</div>

			{/* Filter Summary Text */}
			<p className="text-xs text-blue-700 dark:text-blue-300">
				{activeFilters.length === 1
					? "1 filter applied"
					: `${activeFilters.length} filters applied`}
				. Click on any filter to remove it, or use "Clear all" to reset.
			</p>
		</div>
	)
}
