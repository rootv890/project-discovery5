"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"

interface QuickFilterBarProps {
	onFiltersChange: (filters: string) => void
}

/**
 * Renders a quick filter bar for filtering dashboard items by category, pricing, and featured status.
 *
 * Displays buttons for the top five categories, pricing options ("Free" and "Paid"), and a featured toggle. Allows users to select or clear filters, updating the parent component via the `onFiltersChange` callback with the new filter query string.
 *
 * @param onFiltersChange - Callback invoked with the updated filter query string whenever filters change.
 */
export function QuickFilterBar({ onFiltersChange }: QuickFilterBarProps) {
	const [isPending, startTransition] = useTransition()
	const searchParams = useSearchParams()
	const trpc = useTRPC()

	// Fetch categories from database
	const { data: categories, isLoading } =
		trpc.categories.getCategoriesForSidebar.useQuery()

	// Get top 5 categories by tool count for quick filters
	const quickCategories =
		categories?.sort((a, b) => b.toolCount - a.toolCount).slice(0, 5) || []

	// Handle category filter
	const handleCategoryFilter = (categoryId: string) => {
		startTransition(() => {
			const current = new URLSearchParams(Array.from(searchParams.entries()))
			const categories =
				current.get("categories")?.split(",").filter(Boolean) || []

			if (categories.includes(categoryId)) {
				// Remove category
				const updated = categories.filter((c) => c !== categoryId)
				if (updated.length > 0) {
					current.set("categories", updated.join(","))
				} else {
					current.delete("categories")
				}
			} else {
				// Add category
				categories.push(categoryId)
				current.set("categories", categories.join(","))
			}

			onFiltersChange(current.toString())
		})
	}

	// Handle pricing filter
	const handlePricingFilter = (pricing: string) => {
		startTransition(() => {
			const current = new URLSearchParams(Array.from(searchParams.entries()))

			if (current.get("pricing") === pricing) {
				current.delete("pricing")
			} else {
				current.set("pricing", pricing)
			}

			onFiltersChange(current.toString())
		})
	}

	// Handle featured toggle
	const handleFeaturedToggle = () => {
		startTransition(() => {
			const current = new URLSearchParams(Array.from(searchParams.entries()))

			if (current.get("featured") === "true") {
				current.delete("featured")
			} else {
				current.set("featured", "true")
			}

			onFiltersChange(current.toString())
		})
	}

	// Clear all filters
	const clearAllFilters = () => {
		startTransition(() => {
			const current = new URLSearchParams(Array.from(searchParams.entries()))
			current.delete("categories")
			current.delete("pricing")
			current.delete("featured")

			onFiltersChange(current.toString())
		})
	}

	// Get current filter values
	const selectedCategories =
		searchParams.get("categories")?.split(",").filter(Boolean) || []
	const selectedPricing = searchParams.get("pricing")
	const isFeatured = searchParams.get("featured") === "true"

	// Check if any filters are active
	const hasActiveFilters =
		selectedCategories.length > 0 || selectedPricing || isFeatured

	return (
		<div className="flex flex-wrap items-center gap-2 p-4 border-b">
			<span className="text-sm font-medium text-muted-foreground mr-2">
				Quick Filters:
			</span>

			{/* Category Filters */}
			{isLoading
				? // Loading skeletons
				  Array.from({ length: 5 }).map((_, index) => (
						<Skeleton
							key={index}
							className="h-8 w-20"
						/>
				  ))
				: quickCategories.map((category) => (
						<Button
							key={category.id}
							variant={
								selectedCategories.includes(category.id) ? "default" : "outline"
							}
							size="sm"
							onClick={() => handleCategoryFilter(category.id)}
							disabled={isPending}
							className="h-8"
						>
							{category.name}
							<Badge
								variant="secondary"
								className="ml-1 text-xs"
							>
								{category.toolCount}
							</Badge>
						</Button>
				  ))}

			{/* Pricing Filters */}
			<Button
				variant={selectedPricing === "free" ? "default" : "outline"}
				size="sm"
				onClick={() => handlePricingFilter("free")}
				disabled={isPending}
				className="h-8"
			>
				Free
			</Button>
			<Button
				variant={selectedPricing === "paid" ? "default" : "outline"}
				size="sm"
				onClick={() => handlePricingFilter("paid")}
				disabled={isPending}
				className="h-8"
			>
				Paid
			</Button>

			{/* Featured Filter */}
			<Button
				variant={isFeatured ? "default" : "outline"}
				size="sm"
				onClick={handleFeaturedToggle}
				disabled={isPending}
				className="h-8"
			>
				Featured
			</Button>

			{/* Clear All Filters */}
			{hasActiveFilters && (
				<Button
					variant="ghost"
					size="sm"
					onClick={clearAllFilters}
					disabled={isPending}
					className="h-8 text-muted-foreground hover:text-foreground"
				>
					<X className="h-3 w-3 mr-1" />
					Clear All
				</Button>
			)}
		</div>
	)
}
