// app/components/CategoriesSidebarWrapper.tsx
"use client"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Folder2, Glass, Mobile, Windows } from "iconsax-reactjs"
import {
	AppleIcon,
	Calendar,
	Component,
	Home,
	Inbox,
	Loader2,
	Palette,
	Puzzle,
	Search,
	ServerCog,
	Settings,
	ShieldCheck,
	Type,
	User,
} from "lucide-react"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useMediaQuery } from "react-responsive"
import CategoriesSidebar from "./categories-sidebar"
import {
	CategoriesSidebarErrorFallback,
	CategoriesSidebarSkeleton,
	SidebarSkeletonGroup,
} from "./categories-sidebar-fallbacks"

const CategoriesSidebarWrapper = () => {
	const trpc = useTRPC()
	const { data: categories } = useSuspenseQuery(
		trpc.categories.getManyForSidebar.queryOptions({})
	)

	console.log("CategoriesSidebarWrapper categories:", categories)

	const isMobile = useMediaQuery({
		maxWidth: 768, // Adjust this value based on your design breakpoints
	})

	return (
		<div
			className={cn(
				"  bg-surface z-50 pb-4 rounded-3xl",
				!isMobile && "sticky top-0  left-0"
			)}
		>
			<CategoriesSidebar
				categories={categories.items}
				personalCollections={categories.items}
				relatedPlatforms={categories.items}
			/>
		</div>
	)
}

export default CategoriesSidebarWrapper
