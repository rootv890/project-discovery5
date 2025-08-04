import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useQueryStates } from "nuqs"
import { useCallback, useMemo } from "react"
import { dashboardToolsSearchParams } from "../params"
import { getDefaultParams, getFilterSummary } from "../utils"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface AdvancedFiltersDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

// TODO - Replace with actual API data
const MOCK_PLATFORMS = [
	{ id: "web", name: "Web", count: 89 },
	{ id: "desktop", name: "Desktop", count: 56 },
	{ id: "mobile", name: "Mobile", count: 34 },
	{ id: "api", name: "API", count: 42 },
	{ id: "cli", name: "CLI", count: 23 },
]

// TODO - Replace with actual API data
const MOCK_CATEGORIES = [
	{ id: "development", name: "Development", count: 125 },
	{ id: "design", name: "Design", count: 89 },
	{ id: "productivity", name: "Productivity", count: 78 },
	{ id: "marketing", name: "Marketing", count: 67 },
	{ id: "analytics", name: "Analytics", count: 56 },
	{ id: "communication", name: "Communication", count: 45 },
	{ id: "project-management", name: "Project Management", count: 43 },
	{ id: "finance", name: "Finance", count: 34 },
	{ id: "education", name: "Education", count: 29 },
	{ id: "entertainment", name: "Entertainment", count: 23 },
]

// TODO - Replace with actual API data
const MOCK_TAGS = [
	{ id: "open-source", name: "Open Source", count: 67 },
	{ id: "javascript", name: "JavaScript", count: 45 },
	{ id: "react", name: "React", count: 38 },
	{ id: "typescript", name: "TypeScript", count: 34 },
	{ id: "node", name: "Node.js", count: 29 },
	{ id: "python", name: "Python", count: 26 },
	{ id: "docker", name: "Docker", count: 22 },
	{ id: "kubernetes", name: "Kubernetes", count: 18 },
]

const STATUS_OPTIONS = [
	{ value: "all", label: "All Status" },
	{ value: "approved", label: "Approved" },
	{ value: "pending", label: "Pending" },
	{ value: "rejected", label: "Rejected" },
]

const PRICING_OPTIONS = [
	{ value: "all", label: "All Pricing" },
	{ value: "free", label: "Free" },
	{ value: "freemium", label: "Freemium" },
	{ value: "paid", label: "Paid" },
	{ value: "subscription", label: "Subscription" },
]

// =============================================================================
// MAIN COMPONENT
/**
 * Renders a modal dialog for advanced filtering of dashboard tools, allowing users to refine search results by status, pricing, categories, platforms, tags, and additional options.
 *
 * The dialog displays filter controls with immediate application of changes, shows the count of active filters, and provides options to clear all filters or apply them and close the dialog.
 *
 * @param open - Whether the dialog is visible
 * @param onOpenChange - Callback invoked when the dialog's open state changes
 */

export function AdvancedFiltersDialog({
	open,
	onOpenChange,
}: AdvancedFiltersDialogProps) {
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams)

	// Filter summary
	const { count: filterCount } = useMemo(
		() => getFilterSummary(params),
		[params]
	)

	// Event handlers
	const handleCategoryToggle = useCallback(
		(categoryId: string) => {
			const newCategories = params.categories.includes(categoryId)
				? params.categories.filter((id) => id !== categoryId)
				: [...params.categories, categoryId]

			setParams({ categories: newCategories, page: 1 })
		},
		[params.categories, setParams]
	)

	const handlePlatformToggle = useCallback(
		(platformId: string) => {
			const newPlatforms = params.platforms.includes(platformId)
				? params.platforms.filter((id) => id !== platformId)
				: [...params.platforms, platformId]

			setParams({ platforms: newPlatforms, page: 1 })
		},
		[params.platforms, setParams]
	)

	const handleTagToggle = useCallback(
		(tagId: string) => {
			const newTags = params.tags.includes(tagId)
				? params.tags.filter((id) => id !== tagId)
				: [...params.tags, tagId]

			setParams({ tags: newTags, page: 1 })
		},
		[params.tags, setParams]
	)

	const handleStatusChange = useCallback(
		(status: string) => {
			setParams({ status: status as any, page: 1 })
		},
		[setParams]
	)

	const handlePricingChange = useCallback(
		(pricing: string) => {
			setParams({ pricing: pricing as any, page: 1 })
		},
		[setParams]
	)

	const handleFeaturedToggle = useCallback(
		(featured: boolean) => {
			setParams({ featured, page: 1 })
		},
		[setParams]
	)

	const handleHasImageToggle = useCallback(
		(hasImage: boolean) => {
			setParams({ hasImage, page: 1 })
		},
		[setParams]
	)

	const handleClearAll = useCallback(() => {
		setParams(getDefaultParams())
	}, [setParams])

	const handleApply = useCallback(() => {
		onOpenChange(false)
	}, [onOpenChange])

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center justify-between">
						<span>Advanced Filters</span>
						{filterCount > 0 && (
							<Badge
								variant="secondary"
								className="ml-2"
							>
								{filterCount} active
							</Badge>
						)}
					</DialogTitle>
					<DialogDescription>
						Refine your search with advanced filtering options. Changes are
						applied immediately.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Status & Pricing */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Status</Label>
							<Select
								value={params.status}
								onValueChange={handleStatusChange}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{STATUS_OPTIONS.map((option) => (
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

						<div className="space-y-2">
							<Label>Pricing</Label>
							<Select
								value={params.pricing}
								onValueChange={handlePricingChange}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select pricing" />
								</SelectTrigger>
								<SelectContent>
									{PRICING_OPTIONS.map((option) => (
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
					</div>

					<Separator />

					{/* Categories */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Categories</Label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{MOCK_CATEGORIES.map((category) => (
								<div
									key={category.id}
									className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50"
								>
									<Checkbox
										id={`category-${category.id}`}
										checked={params.categories.includes(category.id)}
										onCheckedChange={() => handleCategoryToggle(category.id)}
									/>
									<Label
										htmlFor={`category-${category.id}`}
										className="flex-1 cursor-pointer flex items-center justify-between"
									>
										<span>{category.name}</span>
										<Badge
											variant="outline"
											className="text-xs"
										>
											{category.count}
										</Badge>
									</Label>
								</div>
							))}
						</div>
					</div>

					<Separator />

					{/* Platforms */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Platforms</Label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{MOCK_PLATFORMS.map((platform) => (
								<div
									key={platform.id}
									className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50"
								>
									<Checkbox
										id={`platform-${platform.id}`}
										checked={params.platforms.includes(platform.id)}
										onCheckedChange={() => handlePlatformToggle(platform.id)}
									/>
									<Label
										htmlFor={`platform-${platform.id}`}
										className="flex-1 cursor-pointer flex items-center justify-between"
									>
										<span>{platform.name}</span>
										<Badge
											variant="outline"
											className="text-xs"
										>
											{platform.count}
										</Badge>
									</Label>
								</div>
							))}
						</div>
					</div>

					<Separator />

					{/* Tags */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Tags</Label>
						<div className="flex flex-wrap gap-2">
							{MOCK_TAGS.map((tag) => (
								<Button
									key={tag.id}
									variant={params.tags.includes(tag.id) ? "filled" : "outline"}
									size="sm"
									onClick={() => handleTagToggle(tag.id)}
									className={cn(
										"gap-2",
										params.tags.includes(tag.id) &&
											"bg-primary text-primary-foreground"
									)}
								>
									<span>{tag.name}</span>
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{tag.count}
									</Badge>
									{params.tags.includes(tag.id) && (
										<X className="h-3 w-3 ml-1" />
									)}
								</Button>
							))}
						</div>
					</div>

					<Separator />

					{/* Additional Filters */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							Additional Options
						</Label>
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="featured"
									checked={params.featured}
									onCheckedChange={handleFeaturedToggle}
								/>
								<Label
									htmlFor="featured"
									className="cursor-pointer"
								>
									Featured tools only
								</Label>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="hasImage"
									checked={params.hasImage}
									onCheckedChange={handleHasImageToggle}
								/>
								<Label
									htmlFor="hasImage"
									className="cursor-pointer"
								>
									Tools with images only
								</Label>
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="flex flex-col sm:flex-row gap-2">
					<Button
						variant="outline"
						onClick={handleClearAll}
						disabled={filterCount === 0}
					>
						Clear All
					</Button>
					<Button onClick={handleApply}>Apply Filters</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
