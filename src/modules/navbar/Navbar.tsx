"use client"

import SearchTrigger from "@/components/SearchTrigger"
import ThemeToggler from "@/components/ThemeToggler"
import { Button } from "@/components/ui/button"
import { Discover, User } from "iconsax-reactjs"
import React, { useState } from "react"

const Navbar = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className="flex items-center justify-between p-4 w-full max-w-screen mx-auto fixed top-0 left-0 right-0 z-50">
			<div className="flex items-center gap-2">
				<Discover
					variant="Bulk"
					size={24}
					className="text-primary"
				/>
				<span className="text-lg font-bold text-on-surface">Discovery5</span>
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
