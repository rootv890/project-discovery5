/**
 * @fileoverview Quick Filter Bar Component
 *
 * Quick access filters for common filtering scenarios:
 * - Popular categories as clickable chips
 * - Quick pricing filters
 * - Featured tools toggle
 * - Clear filters action
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useQueryStates } from "nuqs"
import { dashboardToolsSearchParams } from "../params"

// Quick pricing filters
const QUICK_PRICING = [
	{ id: "free", label: "Free", value: "free" as const },
	{ id: "freemium", label: "Freemium", value: "freemium" as const },
] as const

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface QuickFilterBarProps {
	className?: string
}

// =============================================================================
// MAIN COMPONENT
/**
 * Renders a quick filter bar for dashboard tools, allowing users to filter by top categories, pricing options, and featured status.
 *
 * Displays the five most popular categories, pricing filters ("Free", "Freemium"), a featured toggle, and a clear filters button. Filter state is synchronized with URL query parameters.
 *
 * @param className - Optional CSS class for custom styling
 * @returns The rendered quick filter bar component
 */

export function QuickFilterBar({ className }: QuickFilterBarProps) {
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams)
	const trpc = useTRPC()

	// Fetch categories from the database
	const { data: categoriesResponse, isLoading } = useQuery(
		trpc.categories.getCategoriesForSidebar.queryOptions()
	)

	const categories = categoriesResponse?.items || []

	// Get the top 5 categories by tool count for quick filters
	const quickCategories = categories
		.sort((a, b) => b.toolCount - a.toolCount)
		.slice(0, 5)
		.map((category) => ({
			id: category.id,
			label: category.name,
			value: category.id,
			count: category.toolCount,
		}))

	// Event handlers
	const handleCategoryFilter = (categoryId: string) => {
		const currentCategories = params.categories || []
		const isSelected = currentCategories.includes(categoryId)

		const newCategories = isSelected
			? currentCategories.filter((id) => id !== categoryId)
			: [...currentCategories, categoryId]

		setParams({ categories: newCategories, page: 1 })
	}

	const handlePricingFilter = (
		pricing: (typeof QUICK_PRICING)[number]["value"]
	) => {
		const currentPricing = params.pricing || "all"
		const isSelected = currentPricing === pricing

		const newPricing = isSelected ? ("all" as const) : pricing

		setParams({ pricing: newPricing, page: 1 })
	}

	const handleFeaturedToggle = () => {
		setParams({ featured: !params.featured, page: 1 })
	}

	const handleClearAll = () => {
		setParams({
			categories: [],
			pricing: "all" as const,
			featured: false,
			page: 1,
		})
	}

	// Don't render if still loading categories
	if (isLoading) {
		return (
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Quick filters:</span>
				<div className="flex gap-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="h-8 w-20 animate-pulse rounded-full bg-muted"
						/>
					))}
				</div>
			</div>
		)
	}

	// Check if any quick filters are active
	const hasActiveQuickFilters =
		params.categories.length > 0 || params.pricing !== "all" || params.featured

	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{/* Categories */}
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-sm text-muted-foreground font-medium">
					Quick filters:
				</span>

				{/* Top Categories */}
				{quickCategories.map((category) => {
					const isSelected = params.categories?.includes(category.value)
					return (
						<Button
							key={category.id}
							variant={isSelected ? "filled" : "outline"}
							size="sm"
							onClick={() => handleCategoryFilter(category.value)}
							className="h-8 px-3 text-xs"
						>
							{category.label}
							<Badge
								variant="secondary"
								className="ml-1 h-4 px-1 text-xs"
							>
								{category.count}
							</Badge>
						</Button>
					)
				})}
			</div>

			{/* Divider */}
			<div className="w-px h-6 bg-border" />

			{/* Pricing */}
			<div className="flex flex-wrap items-center gap-2">
				{QUICK_PRICING.map((pricing) => {
					const isSelected = params.pricing === pricing.value
					return (
						<Button
							key={pricing.id}
							variant={isSelected ? "filled" : "outline"}
							size="sm"
							onClick={() => handlePricingFilter(pricing.value)}
							className="h-8 px-3 text-xs"
						>
							{pricing.label}
						</Button>
					)
				})}
			</div>

			{/* Divider */}
			<div className="w-px h-6 bg-border" />

			{/* Featured Toggle */}
			<Button
				variant={params.featured ? "filled" : "outline"}
				size="sm"
				onClick={handleFeaturedToggle}
				className={cn(
					"gap-2 text-xs",
					params.featured && "bg-primary text-primary-foreground"
				)}
			>
				Featured
			</Button>

			{/* Clear All */}
			{hasActiveQuickFilters && (
				<>
					<div className="w-px h-6 bg-border" />
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClearAll}
						className="gap-2 text-xs text-muted-foreground hover:text-foreground"
					>
						<X className="h-3 w-3" />
						Clear
					</Button>
				</>
			)}
		</div>
	)
}
