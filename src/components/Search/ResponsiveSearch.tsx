"use client"

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import SearchDialog from "./SearchDialog"
import SearchTrigger from "./SearchTrigger"

interface ResponsiveSearchProps {
	className?: string
	placeholder?: string
	onSearch?: (query: string) => void
}

export default function ResponsiveSearch({
	className,
	placeholder,
	onSearch,
}: ResponsiveSearchProps) {
	const [open, setOpen] = useState(false)

	const handleClick = () => setOpen(true)

	return (
		<>
			{/* Desktop: Full search bar */}
			<SearchTrigger className={cn("hidden md:flex", className)} />

			{/* Mobile: Compact search button */}
			<SearchTrigger
				variant="compact"
				className={cn("md:hidden", className)}
			/>
			<SearchDialog
				open={open}
				setOpen={setOpen}
				onSearch={onSearch}
				placeholder={placeholder}
			/>
		</>
	)
}
