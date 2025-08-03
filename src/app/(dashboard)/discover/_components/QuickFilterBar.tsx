"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { api } from "@/trpc/react"
import { X } from "lucide-react"

interface QuickFilterBarProps {
	selectedCategories: string[]
	selectedPricing: string[]
	featuredOnly: boolean
	onCategoryToggle: (category: string) => void
	onPricingToggle: (pricing: string) => void
	onFeaturedToggle: () => void
	onClearAll: () => void
}

export function QuickFilterBar({
	selectedCategories,
	selectedPricing,
	featuredOnly,
	onCategoryToggle,
	onPricingToggle,
	onFeaturedToggle,
	onClearAll,
}: QuickFilterBarProps) {
	const { data: categories, isLoading } =
		api.categories.getCategoriesForSidebar.useQuery()

	// Get top 5 categories by tool count for quick filters
	const quickCategories =
		categories?.sort((a, b) => b.toolCount - a.toolCount).slice(0, 5) || []

	const hasActiveFilters =
		selectedCategories.length > 0 || selectedPricing.length > 0 || featuredOnly

	return (
		<div className="flex flex-wrap items-center gap-2 p-4 bg-background/50 border-b">
			{/* Quick Category Filters */}
			{isLoading
				? // Loading skeletons
				  Array.from({ length: 5 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-8 w-20"
						/>
				  ))
				: categories?.slice(0, 5).map((category) => (
						<Button
							key={category.id}
							onClick={() => onCategoryToggle(category.id)}
							variant={
								selectedCategories.includes(category.id) ? "filled" : "outline"
							}
							size="sm"
							className="flex items-center gap-2"
						>
							{category.name}
							<Badge
								variant="secondary"
								className="ml-1"
							>
								{category._count.tools}
							</Badge>
						</Button>
				  ))}

			{/* Pricing and Featured Filters */}
			<div className="ml-auto flex items-center gap-2">
				{/* Pricing Filters */}
				<div className="flex flex-wrap gap-2">
					{["Free", "Freemium", "Paid"].map((pricing) => (
						<Button
							key={pricing}
							onClick={() =>
								onPricingToggle(pricing as "Free" | "Freemium" | "Paid")
							}
							variant={
								selectedPricing.includes(
									pricing as "Free" | "Freemium" | "Paid"
								)
									? "filled"
									: "outline"
							}
							size="sm"
						>
							{pricing}
						</Button>
					))}
				</div>

				{/* Featured Toggle */}
				<Button
					onClick={onFeaturedToggle}
					variant={featuredOnly ? "filled" : "outline"}
					size="sm"
				>
					Featured Only
				</Button>

				{/* Clear All Button */}
				{hasActiveFilters && (
					<Button
						variant="destructive"
						size="sm"
						onClick={onClearAll}
						className="h-8"
					>
						Clear All
						<X className="w-4 h-4 ml-1" />
					</Button>
				)}
			</div>
		</div>
	)
}
