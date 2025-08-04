/**
 * @fileoverview Tools Sorting Component
 *
 * Advanced sorting controls with:
 * - Multiple sort options (name, date, popularity, etc.)
 * - Sort direction toggle (asc/desc)
 * - Per-page size selection
 * - URL state synchronization
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { useQueryStates } from "nuqs"
import { useCallback } from "react"
import { dashboardToolsSearchParams } from "../params"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface ToolsSortingProps {
	total: number
	className?: string
}

const SORT_OPTIONS = [
	{ value: "name", label: "Name" },
	{ value: "createdAt", label: "Date Added" },
	{ value: "updatedAt", label: "Last Updated" },
	{ value: "popularity", label: "Popularity" },
	{ value: "rating", label: "Rating" },
]

const PAGE_SIZE_OPTIONS = [
	{ value: 12, label: "12 per page" },
	{ value: 24, label: "24 per page" },
	{ value: 48, label: "48 per page" },
	{ value: 96, label: "96 per page" },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ToolsSorting({ total, className }: ToolsSortingProps) {
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams)

	// Event handlers
	const handleSortChange = useCallback(
		(sortBy: string) => {
			setParams({ sortBy: sortBy as any, page: 1 })
		},
		[setParams]
	)

	const handleSortDirectionToggle = useCallback(() => {
		const newDirection = params.sortDirection === "asc" ? "desc" : "asc"
		setParams({ sortDirection: newDirection, page: 1 })
	}, [params.sortDirection, setParams])

	const handlePageSizeChange = useCallback(
		(pageSize: string) => {
			setParams({ pageSize: parseInt(pageSize), page: 1 })
		},
		[setParams]
	)

	const currentSortLabel =
		SORT_OPTIONS.find((option) => option.value === params.sortBy)?.label ||
		"Name"

	return (
		<div
			className={cn(
				"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				className
			)}
		>
			{/* Results Count */}
			<div className="text-sm text-muted-foreground">
				{total > 0 ? (
					<>
						Showing <strong>{total.toLocaleString()}</strong> tools
					</>
				) : (
					"No tools found"
				)}
			</div>

			{/* Sorting Controls */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
				{/* Sort By Dropdown */}
				<div className="flex items-center gap-2">
					<Label className="text-sm whitespace-nowrap">Sort by:</Label>
					<Select
						value={params.sortBy}
						onValueChange={handleSortChange}
					>
						<SelectTrigger className="w-36">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{SORT_OPTIONS.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Sort Direction Toggle */}
				<Button
					variant="outline"
					size="sm"
					onClick={handleSortDirectionToggle}
					className="gap-2 w-full sm:w-auto"
				>
					<ArrowUpDown className="h-4 w-4" />
					{params.sortDirection === "asc" ? (
						<>
							<ChevronUp className="h-3 w-3" />
							Ascending
						</>
					) : (
						<>
							<ChevronDown className="h-3 w-3" />
							Descending
						</>
					)}
				</Button>

				{/* Page Size Selector */}
				{total > 12 && (
					<div className="flex items-center gap-2">
						<Label className="text-sm whitespace-nowrap">Show:</Label>
						<Select
							value={params.pageSize.toString()}
							onValueChange={handlePageSizeChange}
						>
							<SelectTrigger className="w-32">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{PAGE_SIZE_OPTIONS.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value.toString()}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>
		</div>
	)
}
