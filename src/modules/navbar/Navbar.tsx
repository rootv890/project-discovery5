"use client"

import SearchTrigger from "@/components/SearchTrigger"
import ThemeToggler from "@/components/ThemeToggler"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Discover, User } from "iconsax-reactjs"
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react"
import React, { useState } from "react"

const Navbar = () => {
	const [open, setOpen] = useState(false)
	const { isMobile, state, toggleSidebar } = useSidebar()
	return (
		<div className="flex  items-center justify-between p-2 px-4 w-full h-[72px]  bg-surface fixed top-0  mx-auto z-100">
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

			{/* Searhc input */}
			<div className="flex items-center gap-2">
				<SearchTrigger
					open={open}
					setOpen={setOpen}
				/>
			</div>
			<div className="flex items-center gap-2">
				<ThemeToggler />
				<Button
					variant={"filled"}
					size={"sm"}
					className="h-10"
				>
					<User
						variant="Bold"
						size={24}
						className="text-on-primary"
					/>
					Sign in
				</Button>
			</div>
		</div>
	)
}

export default Navbar
