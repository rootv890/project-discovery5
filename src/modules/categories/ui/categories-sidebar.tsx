"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { getManyForSidebar } from "../types"

type CategoriesSidebarProps = {
	name?: string
	categories: getManyForSidebar["items"]
	personalCollections?: getManyForSidebar["items"]
	relatedPlatforms?: getManyForSidebar["items"]
	className?: string
	children?: ReactNode
}

const renderSidebarItems = (
	items: getManyForSidebar["items"] = [],
	isActive: (id: string) => boolean = () => false
) => (
	<SidebarMenu>
		{items.map((item) => (
			<SidebarMenuItem key={item.id}>
				<SidebarMenuButton
					className={cn(
						"py-6 px-4 rounded-2xl hover:bg-secondary-container ",
						isActive(item.id) && "bg-secondary-container"
					)}
					asChild
				>
					<Link
						// href={`#`}
						href={`/c/${item.id}`}
						className="group/item w-full"
					>
						<div className="flex  w-full justify-between items-center">
							<div className="flex items-center gap-2 group-hover/item:[&>svg]:fill-primary">
								{item.iconSvg && (
									<span
										dangerouslySetInnerHTML={{
											__html: item.iconSvg,
										}}
									/>
								)}

								<span>{item.name}</span>
							</div>
							{item.totalCategories && (
								<Badge
									className={cn(
										"text-on-surface-variant bg-surface hidden hover:block",
										isActive(item.id) && "flex"
									)}
								>
									{item.totalCategories}
								</Badge>
							)}
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		))}
	</SidebarMenu>
)

export default function CategoriesSidebar({
	name: title = "Categories",
	categories: platformCategories,
	personalCollections,
	relatedPlatforms,
	className,
}: CategoriesSidebarProps) {
	const { state } = useSidebar()
	const isCollapsed = state === "collapsed"
	const pathname = usePathname()

	return (
		<div
			className={cn(
				"z-50 pb-12",
				!isCollapsed && "sticky top-4 left-0",
				className
			)}
		>
			<Sidebar
				variant="sidebar"
				className="bg-transparent px-4 h-[calc(100vh-42px)] flex-1 gap-0"
			>
				<SidebarContent className="border-none bg-surface-container border-r-0 rounded-3xl overflow-y-auto h-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent ">
					<SidebarHeader className="pl-4 pt-4">
						<span className="text-lg font-bold text-on-primary-container">
							{title}
						</span>
					</SidebarHeader>

					<SidebarGroup>
						<SidebarGroupContent>
							{renderSidebarItems(personalCollections, (id) => {
								// check if path contains id
								return pathname.includes(id)
							})}
						</SidebarGroupContent>
					</SidebarGroup>

					{personalCollections && personalCollections.length > 0 && (
						<>
							<Separator className="bg-outline-variant !h-[2px] rounded-full !w-3/4 mx-auto" />
							<SidebarGroup>
								<SidebarGroupLabel>My Collections</SidebarGroupLabel>
								<SidebarGroupContent>
									{renderSidebarItems(personalCollections, (id) => {
										// check if path contains id
										return pathname.includes(id)
									})}
								</SidebarGroupContent>
							</SidebarGroup>
						</>
					)}

					{relatedPlatforms && relatedPlatforms.length > 0 && (
						<>
							<Separator className="bg-outline-variant !h-[2px] rounded-full !w-3/4 mx-auto" />
							<SidebarGroup>
								<SidebarGroupLabel>Related Platforms</SidebarGroupLabel>
								<SidebarGroupContent>
									{renderSidebarItems(personalCollections, (id) => {
										// check if path contains id
										return pathname.includes(id)
									})}
								</SidebarGroupContent>
							</SidebarGroup>
						</>
					)}
				</SidebarContent>
			</Sidebar>
		</div>
	)
}
