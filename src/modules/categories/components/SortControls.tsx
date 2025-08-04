/**
 * @fileoverview Sort Controls Component - URL-Synchronized Sorting Interface
 *
 * This component demonstrates professional URL state management for sorting:
 * - Combined sort field and direction controls
 * - Intelligent default behavior and validation
 * - Accessible dropdown and button interfaces
 * - Real-time URL updates with pagination reset
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
	CATEGORY_SORT_FIELDS,
	categorySearchParams,
	SORT_DIRECTIONS,
	type CategorySortField,
	type SortDirection,
} from "@/modules/categories/params"
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	SortAsc,
	SortDesc,
} from "lucide-react"
import { useQueryStates } from "nuqs"

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Renders sorting controls for categories with real-time URL synchronization and accessibility support.
 *
 * Provides a dropdown to select the sort field and a button to toggle sort direction, both of which update URL query parameters and reset pagination. The component applies intelligent default sort directions per field and includes accessible labels and visual indicators for the current sort state.
 */
export function SortControls() {
	const [{ sortBy, sortDirection }, setParams] =
		useQueryStates(categorySearchParams)

	/**
	 * Handle sort field changes with intelligent direction defaults
	 * Different fields have different logical default directions
	 */
	const handleSortFieldChange = (newSortBy: CategorySortField) => {
		// Define smart defaults for different sort fields
		const fieldDefaults: Record<CategorySortField, SortDirection> = {
			name: "asc", // Alphabetical: A→Z makes sense
			slug: "asc", // Alphabetical: A→Z makes sense
			createdAt: "desc", // Dates: newest first is typical
			updatedAt: "desc", // Dates: newest first is typical
			toolCount: "desc", // Numbers: highest first is typical
			popularity: "desc", // Numbers: most popular first
		}

		const defaultDirection = fieldDefaults[newSortBy] || "desc"

		setParams({
			sortBy: newSortBy,
			sortDirection: defaultDirection,
			page: 1, // Reset pagination when sorting changes
		})
	}

	/**
	 * Toggle sort direction for current field
	 * Provides quick way to reverse current sort
	 */
	const handleDirectionToggle = () => {
		const newDirection: SortDirection = sortDirection === "asc" ? "desc" : "asc"

		setParams({
			sortDirection: newDirection,
			page: 1, // Reset pagination when sorting changes
		})
	}

	/**
	 * Get human-readable labels for sort fields
	 */
	const getSortFieldLabel = (field: CategorySortField): string => {
		const labels: Record<CategorySortField, string> = {
			name: "Name",
			slug: "URL Slug",
			createdAt: "Created Date",
			updatedAt: "Updated Date",
			toolCount: "Tool Count",
			popularity: "Popularity",
		}
		return labels[field] || field
	}

	/**
	 * Get description of current sort state for accessibility
	 */
	const getSortDescription = (): string => {
		const fieldLabel = getSortFieldLabel(sortBy)
		const directionLabel = sortDirection === "asc" ? "ascending" : "descending"
		return `Sorted by ${fieldLabel}, ${directionLabel}`
	}

	return (
		<div className="flex items-center space-x-3">
			{/* Sort Field Selector */}
			<div className="flex items-center space-x-2">
				<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Sort by:
				</span>
				<Select
					value={sortBy}
					onValueChange={handleSortFieldChange}
				>
					<SelectTrigger className="w-[140px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{CATEGORY_SORT_FIELDS.map((field) => (
							<SelectItem
								key={field}
								value={field}
							>
								{getSortFieldLabel(field)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Sort Direction Toggle */}
			<Button
				variant="outline"
				size="sm"
				onClick={handleDirectionToggle}
				className={cn(
					"flex items-center space-x-2 min-w-[100px]",
					"hover:bg-gray-50 dark:hover:bg-gray-800"
				)}
				title={`Toggle sort direction (currently ${sortDirection}ending)`}
			>
				{sortDirection === "asc" ? (
					<>
						<SortAsc className="h-4 w-4" />
						<span className="text-xs">A→Z</span>
					</>
				) : (
					<>
						<SortDesc className="h-4 w-4" />
						<span className="text-xs">Z→A</span>
					</>
				)}
			</Button>

			{/* Sort State Description (for screen readers) */}
			<span className="sr-only">{getSortDescription()}</span>

			{/* Visual Sort Indicator */}
			<div className="hidden sm:flex items-center text-xs text-gray-500 dark:text-gray-400">
				<ArrowUpDown className="h-3 w-3 mr-1" />
				<span>{getSortDescription()}</span>
			</div>
		</div>
	)
}
