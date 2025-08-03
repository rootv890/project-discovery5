import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/ui/responsive-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Grid } from "lucide-react"

const CategoryToolsViewSkeleton = () => {
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
							disabled
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Dashboard
						</Button>
					</div>

					{/* Category Header */}
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="space-y-2">
								<Skeleton className="h-10 w-64" />
								<div className="flex items-center gap-2">
									<Skeleton className="h-6 w-20" />
									<Skeleton className="h-4 w-32" />
								</div>
							</div>
						</div>

						{/* Search and Filters */}
						<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
							{/* Search Input */}
							<div className="relative flex-1 max-w-md">
								<Skeleton className="h-10 w-full" />
							</div>

							{/* View Toggle */}
							<div className="flex items-center gap-2">
								<div className="flex bg-muted rounded-lg p-1">
									<Button
										variant="filled"
										size="sm"
										disabled
										className="px-3 py-1.5 h-auto bg-background shadow-sm"
									>
										<Grid className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										disabled
										className="px-3 py-1.5 h-auto"
									>
										<Grid className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tools Grid Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="rounded-[28px] overflow-hidden bg-surface-container"
						>
							{/* Image skeleton */}
							<div className="w-full p-2">
								<Skeleton className="aspect-video w-full rounded-[20px]" />
							</div>

							{/* Content skeleton */}
							<div className="p-4 space-y-3">
								<div className="flex justify-between items-start">
									<Skeleton className="h-6 w-3/4" />
									<div className="flex gap-1">
										<Skeleton className="h-8 w-8 rounded-md" />
										<Skeleton className="h-8 w-8 rounded-md" />
									</div>
								</div>
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />

								{/* Button skeletons */}
								<div className="flex gap-2 pt-2">
									<Skeleton className="h-8 w-20" />
									<Skeleton className="h-8 w-20" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</ResponsiveContainer>
	)
}

export default CategoryToolsViewSkeleton
