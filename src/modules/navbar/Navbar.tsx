"use client"

import { ResponsiveSearch } from "@/components/Search"
import ThemeToggler from "@/components/ThemeToggler"
import { UserProfile } from "@/components/UserProfile"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Discover } from "iconsax-reactjs"
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react"
import React from "react"

const Navbar = () => {
	const { isMobile, state, toggleSidebar } = useSidebar()

	return (
		<div className="flex items-center justify-between p-2 px-4 w-full h-[72px] bg-surface fixed top-0 mx-auto z-100">
			<div className="flex items-center gap-2">
				<Button
					variant={"ghost"}
					borderType={"round"}
					size={"sm"}
					onClick={toggleSidebar}
				>
					{state === "expanded" ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
				</Button>
				<Discover
					variant="Bulk"
					size={24}
					className="text-primary"
				/>
				{!isMobile && (
					<span className="text-lg font-bold text-on-surface">Discovery5</span>
				)}
			</div>

			{/* Search input */}

			<ResponsiveSearch />

			<div className="flex items-center gap-2">
				<ThemeToggler />
				<UserProfile
					size={isMobile ? "sm" : "md"}
					align="end"
					side="bottom"
				/>
			</div>
		</div>
	)
}

export default Navbar
