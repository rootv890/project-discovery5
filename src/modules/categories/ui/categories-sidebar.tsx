"use client"

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
import { SelectCategoryType } from "@/db/tables/categories"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { z } from "zod"
import { getManyForSidebar } from "../types"

type CategoriesSidebarProps = {
	name?: string
	categories: getManyForSidebar["items"]
	personalCollections?: getManyForSidebar["items"]
	relatedPlatforms?: getManyForSidebar["items"]
	className?: string
	children?: ReactNode
}

const renderSidebarItems = (items: getManyForSidebar["items"] = []) => (
	<SidebarMenu>
		{items.map((item) => (
			<SidebarMenuItem key={item.id}>
				<SidebarMenuButton
					className="py-6 px-4 rounded-2xl hover:bg-secondary-container"
					asChild
				>
					<Link
						href={`/c/${item.id}`}
						className="group/item w-full"
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2 group-hover/item:[&>svg]:fill-primary">
								<Image
									src={item.iconSvg || "not-found.svg"}
									width={10}
									height={10}
									alt={item.name}
									className="size-4"
								/>
								<span>{item.name}</span>
							</div>
							{item.totalCategories && (
								<span className="text-on-surface-variant">
									{item.totalCategories}
								</span>
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
							{renderSidebarItems(platformCategories)}
						</SidebarGroupContent>
					</SidebarGroup>

					{personalCollections && personalCollections.length > 0 && (
						<>
							<Separator className="bg-outline-variant !h-[2px] rounded-full !w-3/4 mx-auto" />
							<SidebarGroup>
								<SidebarGroupLabel>My Collections</SidebarGroupLabel>
								<SidebarGroupContent>
									{renderSidebarItems(personalCollections)}
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
									{renderSidebarItems(relatedPlatforms)}
								</SidebarGroupContent>
							</SidebarGroup>
						</>
					)}
				</SidebarContent>
			</Sidebar>
		</div>
	)
}
