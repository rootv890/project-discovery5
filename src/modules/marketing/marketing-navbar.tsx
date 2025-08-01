"use client"
import { HiMenuAlt3 } from "react-icons/hi"
import { RiCloseFill } from "react-icons/ri"

import { useMenuSidebarStore } from "@/store/menu-sidebar-store"
import { CompassIcon, HamburgerIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

const navItems = [
	{
		id: "home",
		path: "/landing",
		label: "Home",
	},
	{
		id: "dashboard",
		path: "/dashboard",
		label: "Dashboard",
	},
	{
		id: "search",
		path: "/search",
		label: "Search",
	},
]

const accountItems = [
	{
		id: "sign-up",
		path: "/auth/enter",
		label: "Sign Up",
	},
	{
		id: "login",
		path: "/auth/enter",
		label: "Login",
	},
]

const MarketingNavbar = () => {
	const { open, toggle } = useMenuSidebarStore()
	return (
		<nav className="fixed z-50 p-4 w-full left-0 top-0 flex items-center justify-between glass grain-overlay">
			{/* Left - Logo */}
			<div className="flex items-center gap-2 text-2xl text-on-primary-fixed">
				<CompassIcon size={32} />
				<span className="font-bold">discovery5</span>
			</div>
		</nav>
	)
}

export default MarketingNavbar
