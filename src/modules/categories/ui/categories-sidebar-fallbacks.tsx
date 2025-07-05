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

export const SidebarSkeletonGroup = ({ count = 5 }: { count?: number }) => (
	<SidebarGroup>
		<SidebarGroupLabel>
			<Skeleton className="h-4 w-32 bg-surface-dim rounded-md" />
		</SidebarGroupLabel>
		<SidebarGroupContent>
			<SidebarMenu>
				{Array.from({ length: count }).map((_, idx) => (
					<SidebarMenuItem key={idx}>
						<Skeleton className="flex bg-surface-dim  items-center gap-3 px-4 py-3">
							<Skeleton className="h-5 w-5 rounded-md" />
							<Skeleton className="h-4 w-3/4 rounded-md" />
						</Skeleton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroupContent>
	</SidebarGroup>
)

export const CategoriesSidebarSkeleton = () => {
	return (
		<Sidebar className="bg-transparent px-4 h-[90vh] flex-1">
			<SidebarContent className="border-none bg-surface-container border-r-0 rounded-3xl overflow-y-auto h-full scrollbar-thin">
				<SidebarHeader className="pl-4 pt-4 bg-surface-dim">
					<Skeleton className="h-6 w-28 rounded-md" />
				</SidebarHeader>
				{/* Categories Section */}
				<SidebarSkeletonGroup count={4} />

				{/* Personal Collections */}
				<SidebarSkeletonGroup count={3} />

				{/* Related Platforms */}
				<SidebarSkeletonGroup count={4} />
			</SidebarContent>
		</Sidebar>
	)
}

type ErrorFallbackProps = {
	error: Error
	resetErrorBoundary: () => void
}

export const CategoriesSidebarErrorFallback = ({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) => {
	return (
		<div className="p-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
			<p className="font-semibold">Something went wrong 😞</p>
			<p className="mt-1 text-xs text-red-500">{error.message}</p>
			<button
				onClick={resetErrorBoundary}
				className="mt-3 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-1.5 text-white hover:bg-red-700 text-xs"
			>
				Try Again
			</button>
		</div>
	)
}
