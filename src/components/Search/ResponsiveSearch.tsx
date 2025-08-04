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

/**
 * Renders a responsive search component with triggers for both desktop and mobile views and a dialog for entering search queries.
 *
 * Displays a full search bar on medium and larger screens and a compact search button on smaller screens. When triggered, a search dialog appears, allowing users to input queries. An optional callback is invoked when a search is performed.
 *
 * @param className - Additional CSS classes to apply to the search triggers
 * @param placeholder - Placeholder text for the search input field in the dialog
 * @param onSearch - Callback function called with the search query when a search is submitted
 */
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
