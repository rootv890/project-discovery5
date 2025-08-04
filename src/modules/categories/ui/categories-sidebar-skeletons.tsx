import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

// ============================================================================
// SUBTLE SKELETON COMPONENTS
// ============================================================================

// Subtle skeleton with gentle shimmer
const SubtleSkeleton = ({
	className,
	delay = 0,
	width = "100%",
	...props
}: React.ComponentProps<"div"> & {
	delay?: number
	width?: string | number
}) => {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-lg bg-surface-dim/50",
				"animate-pulse",
				className
			)}
			style={{
				width: typeof width === "string" ? width : `${width}%`,
				animationDelay: `${delay * 50}ms`,
				animationDuration: "2s",
			}}
			{...props}
		>
			{/* Very subtle shimmer */}
			<div
				className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container/30 to-transparent animate-[shimmer_3s_infinite] -translate-x-full"
				style={{ animationDelay: `${delay * 100}ms` }}
			/>
		</div>
	)
}

// Simple skeleton item
const SkeletonMenuItem = ({ index }: { index: number }) => {
	// Subtle width variation
	const textWidth = useMemo(() => Math.floor(Math.random() * 20) + 60, [])
	const hasCount = useMemo(() => Math.random() > 0.4, []) // 60% chance

	return (
		<SidebarMenuItem>
			<div className="flex items-center gap-3 px-4 py-3 rounded-xl">
				{/* Icon skeleton */}
				<SubtleSkeleton
					className="size-5 rounded-md flex-shrink-0"
					delay={index}
				/>

				{/* Text and badge */}
				<div className="flex-1 flex items-center justify-between">
					<SubtleSkeleton
						className="h-3.5 rounded-md"
						width={textWidth}
						delay={index}
					/>

					{hasCount && (
						<SubtleSkeleton
							className="h-4 w-6 rounded-full ml-2"
							delay={index}
						/>
					)}
				</div>
			</div>
		</SidebarMenuItem>
	)
}

// Minimal group component
export const SidebarSkeletonGroup = ({
	count = 5,
	delay = 0,
}: {
	count?: number
	delay?: number
}) => (
	<SidebarGroup>
		<SidebarGroupLabel className="px-4 pb-2">
			<SubtleSkeleton
				className="h-3 rounded-md"
				width={Math.floor(Math.random() * 15) + 70} // 70-85% width
				delay={delay}
			/>
		</SidebarGroupLabel>
		<SidebarGroupContent>
			<SidebarMenu className="space-y-1">
				{Array.from({ length: count }).map((_, idx) => (
					<SkeletonMenuItem
						key={idx}
						index={idx + delay}
					/>
				))}
			</SidebarMenu>
		</SidebarGroupContent>
	</SidebarGroup>
)

// Clean main skeleton
export const CategoriesSidebarSkeleton = () => {
	return (
		<Sidebar className="bg-transparent px-4 h-[90vh] flex-1">
			<SidebarContent className="border-none bg-surface-container border-r-0 rounded-3xl overflow-y-auto h-full scrollbar-thin">
				{/* Header */}
				<SidebarHeader className="pl-4 pt-4">
					<SubtleSkeleton
						className="h-6 rounded-md"
						width={65}
						delay={0}
					/>
				</SidebarHeader>

				{/* Categories */}
				<SidebarSkeletonGroup
					count={4}
					delay={1}
				/>

				{/* Separator */}
				<div className="mx-8 my-4">
					<SubtleSkeleton
						className="h-px w-3/4 mx-auto"
						delay={2}
					/>
				</div>

				{/* Collections */}
				<SidebarSkeletonGroup
					count={3}
					delay={3}
				/>

				{/* Separator */}
				<div className="mx-8 my-4">
					<SubtleSkeleton
						className="h-px w-3/4 mx-auto"
						delay={4}
					/>
				</div>

				{/* Platforms */}
				<SidebarSkeletonGroup
					count={4}
					delay={5}
				/>
			</SidebarContent>
		</Sidebar>
	)
}
