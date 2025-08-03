/**
 * @fileoverview Tools Search Filter Bar Component
 *
 * Comprehensive search and filtering interface with:
 * - Real-time search with debouncing
 * - Multi-select filters for categories, platforms, tags
 * - Status and pricing filters
 * - View mode toggle (grid/list)
 * - URL state synchronization
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react"
import { useQueryStates } from "nuqs"
import { useCallback, useMemo, useState } from "react"
import { dashboardToolsSearchParams } from "../params"
import { ViewMode } from "../types"
import { getFilterSummary, hasActiveFilters } from "../utils"
import { AdvancedFiltersDialog } from "./AdvancedFiltersDialog"

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ToolsSearchFilterBar() {
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams)
	const [filtersOpen, setFiltersOpen] = useState(false)

	// Filter summary
	const { count: filterCount, labels: filterLabels } = useMemo(
		() => getFilterSummary(params),
		[params]
	)

	const hasFilters = hasActiveFilters(params)

	// Event handlers
	const handleSearchChange = useCallback(
		(value: string) => {
			setParams({ search: value, page: 1 })
		},
		[setParams]
	)

	const handleViewModeChange = useCallback(
		(viewMode: ViewMode) => {
			setParams({ view: viewMode })
		},
		[setParams]
	)

	const handleClearFilters = useCallback(() => {
		setParams({
			search: "",
			status: "approved",
			pricing: "all",
			categories: [],
			platforms: [],
			tags: [],
			featured: false,
			hasImage: false,
			page: 1,
		})
	}, [setParams])

	const handleRemoveFilter = useCallback(
		(filterType: string, filterValue?: string) => {
			switch (filterType) {
				case "search":
					setParams({ search: "", page: 1 })
					break
				case "status":
					setParams({ status: "approved", page: 1 })
					break
				case "pricing":
					setParams({ pricing: "all", page: 1 })
					break
				case "category":
					if (filterValue) {
						const newCategories = params.categories.filter(
							(c) => c !== filterValue
						)
						setParams({ categories: newCategories, page: 1 })
					}
					break
				case "platform":
					if (filterValue) {
						const newPlatforms = params.platforms.filter(
							(p) => p !== filterValue
						)
						setParams({ platforms: newPlatforms, page: 1 })
					}
					break
				case "tag":
					if (filterValue) {
						const newTags = params.tags.filter((t) => t !== filterValue)
						setParams({ tags: newTags, page: 1 })
					}
					break
				case "featured":
					setParams({ featured: false, page: 1 })
					break
				case "hasImage":
					setParams({ hasImage: false, page: 1 })
					break
			}
		},
		[params, setParams]
	)

	return (
		<>
			<div className="space-y-4">
				{/* Search Bar and View Toggle */}
				<div className="flex flex-col sm:flex-row gap-4">
					{/* Search Input */}
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search tools..."
							value={params.search}
							onChange={(e) => handleSearchChange(e.target.value)}
							className="pl-10"
						/>
					</div>

					{/* View Mode Toggle */}
					<ViewModeToggle
						currentView={params.view}
						onViewChange={handleViewModeChange}
					/>

					{/* Advanced Filters Button */}
					<Button
						variant="tonal"
						size="md"
						onClick={() => setFiltersOpen(true)}
						className={cn("gap-2 ", hasFilters && " text-primary")}
					>
						<SlidersHorizontal className="h-4 w-4" />
						Filters
						{filterCount > 0 && (
							<span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
								{filterCount}
							</span>
						)}
					</Button>
				</div>

				{/* Active Filters Display */}
				{hasFilters && (
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-sm text-muted-foreground">
							Active filters:
						</span>

						{/* Search Filter */}
						{params.search && (
							<FilterChip
								label={`Search: "${params.search}"`}
								onRemove={() => handleRemoveFilter("search")}
							/>
						)}

						{/* Status Filter */}
						{params.status !== "approved" && (
							<FilterChip
								label={`Status: ${params.status}`}
								onRemove={() => handleRemoveFilter("status")}
							/>
						)}

						{/* Pricing Filter */}
						{params.pricing !== "all" && (
							<FilterChip
								label={`Pricing: ${params.pricing}`}
								onRemove={() => handleRemoveFilter("pricing")}
							/>
						)}

						{/* Category Filters */}
						{params.categories.slice(0, 2).map((category) => (
							<FilterChip
								key={category}
								label={`Category: ${category}`}
								onRemove={() => handleRemoveFilter("category", category)}
							/>
						))}

						{/* Platform Filters */}
						{params.platforms.slice(0, 2).map((platform) => (
							<FilterChip
								key={platform}
								label={`Platform: ${platform}`}
								onRemove={() => handleRemoveFilter("platform", platform)}
							/>
						))}

						{/* Tag Filters */}
						{params.tags.slice(0, 2).map((tag) => (
							<FilterChip
								key={tag}
								label={`Tag: ${tag}`}
								onRemove={() => handleRemoveFilter("tag", tag)}
							/>
						))}

						{/* Additional Filters */}
						{params.featured && (
							<FilterChip
								label="Featured only"
								onRemove={() => handleRemoveFilter("featured")}
							/>
						)}

						{params.hasImage && (
							<FilterChip
								label="With images"
								onRemove={() => handleRemoveFilter("hasImage")}
							/>
						)}

						{/* Show remaining count if there are more filters */}
						{filterCount > 6 && (
							<span className="text-sm text-muted-foreground">
								+{filterCount - 6} more
							</span>
						)}

						<Button
							variant="ghost"
							size="sm"
							onClick={handleClearFilters}
							className="h-6 px-2 text-xs"
						>
							Clear all
						</Button>
					</div>
				)}
			</div>

			{/* Advanced Filters Dialog */}
			<AdvancedFiltersDialog
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
			/>
		</>
	)
}

// =============================================================================
// VIEW MODE TOGGLE COMPONENT
// =============================================================================

interface ViewModeToggleProps {
	currentView: ViewMode
	onViewChange: (view: ViewMode) => void
}

function ViewModeToggle({ currentView, onViewChange }: ViewModeToggleProps) {
	return (
		<div className="flex bg-muted rounded-lg p-1">
			<Button
				variant={currentView === "grid" ? "filled" : "ghost"}
				size="sm"
				onClick={() => onViewChange("grid")}
				className="gap-2"
			>
				<Grid3X3 className="h-4 w-4" />
				<span className="hidden sm:inline">Grid</span>
			</Button>
			<Button
				variant={currentView === "list" ? "filled" : "ghost"}
				size="sm"
				onClick={() => onViewChange("list")}
				className="gap-2"
			>
				<List className="h-4 w-4" />
				<span className="hidden sm:inline">List</span>
			</Button>
		</div>
	)
}

// =============================================================================
// FILTER CHIP COMPONENT
// =============================================================================

interface FilterChipProps {
	label: string
	onRemove?: () => void
}

function FilterChip({ label, onRemove }: FilterChipProps) {
	return (
		<div className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-md px-2 py-1 text-xs">
			<span>{label}</span>
			{onRemove && (
				<Button
					variant="ghost"
					size="sm"
					onClick={onRemove}
					className="h-4 w-4 p-0 hover:bg-transparent"
				>
					<X className="h-3 w-3" />
				</Button>
			)}
		</div>
	)
}

// =============================================================================
// SEARCH STATS COMPONENT
// =============================================================================

interface SearchStatsProps {
	total: number
	searchTerm?: string
	className?: string
}

export function SearchStats({
	total,
	searchTerm,
	className,
}: SearchStatsProps) {
	return (
		<div className={cn("text-sm text-muted-foreground", className)}>
			{searchTerm ? (
				<>
					Found <strong>{total.toLocaleString()}</strong> results for{" "}
					<strong>"{searchTerm}"</strong>
				</>
			) : (
				<>
					Showing <strong>{total.toLocaleString()}</strong> tools
				</>
			)}
		</div>
	)
}
