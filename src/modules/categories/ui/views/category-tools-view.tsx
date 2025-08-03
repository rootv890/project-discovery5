"use client"

import { HorizontalProductCard } from "@/components/HorizontalProductCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	ProductGrid,
	ResponsiveContainer,
} from "@/components/ui/responsive-grid"
import { VerticalProductCard } from "@/components/VerticalProductCard"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ArrowLeft, Grid, List, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type CategoryToolsViewProps = {
	categoryId: string
}

const CategoryToolsView = ({ categoryId }: CategoryToolsViewProps) => {
	const [cardType, setCardType] = useState<"vertical" | "horizontal">(
		"vertical"
	)
	const [searchQuery, setSearchQuery] = useState("")

	const trpc = useTRPC()

	// Get tools in category
	const { data: toolsResponse } = useSuspenseQuery(
		trpc.categories.getAllToolsInCategory.queryOptions({
			categoryId,
		})
	)

	// Get category info separately
	const { data: categoryResponse } = useSuspenseQuery(
		trpc.categories.getCategoryById.queryOptions({
			categoryId,
		})
	)

	// Extract data from the response structure based on your provided example
	const tools =
		toolsResponse?.data?.map((toolCategory) => toolCategory.tool) || []

	// Filter tools based on search query
	const filteredTools = tools.filter(
		(tool) =>
			tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			tool.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			tool.description?.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Get category name from the category response
	const categoryName = categoryResponse?.data?.name || "Category"
	const categoryDescription = categoryResponse?.data?.description
	const totalTools = filteredTools.length

	return (
		<ResponsiveContainer
			maxWidth="7xl"
			className="py-8"
		>
			<div className="space-y-8">
				{/* Header Section */}
				<div className="space-y-6">
					{/* Back Navigation */}
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="gap-2"
						>
							<Link href="/">
								<ArrowLeft className="h-4 w-4" />
								Back to Dashboard
							</Link>
						</Button>
					</div>

					{/* Category Header */}
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold tracking-tight">
									{categoryName}
								</h1>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Badge
										variant="secondary"
										className="text-sm bg-primary-fixed-dim/30"
									>
										{totalTools} {totalTools === 1 ? "tool" : "tools"}
									</Badge>
									{categoryDescription && (
										<span className="text-sm">• {categoryDescription}</span>
									)}
								</div>
							</div>
						</div>

						{/* Search and Filters */}
						<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
							{/* Search Input */}
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder={`Search${categoryName} tools...`}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								/>
							</div>

							{/* View Toggle */}
							<div className="flex items-center gap-2">
								<div className="flex bg-primary-fixed-dim/20 rounded-lg p-1">
									<Button
										variant={cardType === "vertical" ? "filled" : "ghost"}
										size="sm"
										borderType={"square"}
										onClick={() => setCardType("vertical")}
										className={cn(
											"px-3 py-1.5 h-auto",
											cardType === "vertical" && "bg-primary shadow-sm"
										)}
									>
										<Grid className="h-4 w-4" />
									</Button>
									<Button
										variant={cardType === "horizontal" ? "filled" : "ghost"}
										size="sm"
										onClick={() => setCardType("horizontal")}
										className={cn(
											"px-3 py-1.5 h-auto",
											cardType === "horizontal" && "bg-primary shadow-sm"
										)}
									>
										<List className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tools Grid */}
				{filteredTools.length > 0 ? (
					<ProductGrid
						cardType={cardType}
						className="mt-8"
						preferredGap={cardType === "horizontal" ? 12 : 16}
					>
						{filteredTools.map((tool) => {
							const cardProps = {
								imageSrc: "/images/hero-img.jpg",
								title: tool.name,
								subtitle: tool.subtitle || "",
								description: tool.description || "No description available",
								visitUrl: tool.imageUrl || undefined,
								moreInfoUrl: `/tools/${tool.slug}`,
								variant: "filled" as const,
							}

							return cardType === "horizontal" ? (
								<HorizontalProductCard
									key={tool.id}
									{...cardProps}
								/>
							) : (
								<VerticalProductCard
									key={tool.id}
									{...cardProps}
								/>
							)
						})}
					</ProductGrid>
				) : (
					/* Empty State */
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
							<Search className="h-8 w-8 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-semibold mb-2">
							{searchQuery ? "No tools found" : "No tools available"}
						</h3>
						<p className="text-muted-foreground mb-4 max-w-md">
							{searchQuery
								? `No tools match "${searchQuery}". Try adjusting your search terms.`
								: "This category doesn't have any tools yet. Check back later!"}
						</p>
						{searchQuery && (
							<Button
								variant="outline"
								onClick={() => setSearchQuery("")}
								className="gap-2"
							>
								Clear Search
							</Button>
						)}
					</div>
				)}
			</div>
		</ResponsiveContainer>
	)
}

export default CategoryToolsView
