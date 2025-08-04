import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import SearchIsland from "./SearchIsland"

export function SearchTriggerInput({
	className,
	onClick,
}: {
	className?: string
	onClick: () => void
}) {
	return (
		<>
			{/* 🔍 Full search bar on desktop */}
			<button
				onClick={onClick}
				className={cn(
					"hidden md:flex w-full max-w-3xl h-[56px] px-4 rounded-full",
					"bg-surface-container-high text-on-surface shadow-sm hover:shadow-md transition-shadow",
					"items-center justify-between gap-4",
					className
				)}
			>
				<div className="flex-1 px-3 text-on-surface">
					Search for anything...
				</div>

				<div className="p-2 bg-primary text-on-primary rounded-full">
					<SearchIcon className="size-4" />
				</div>
			</button>

			{/* 🔍 Compact search trigger on mobile */}
			<button
				onClick={onClick}
				aria-label="Search"
				className="flex md:hidden items-center gap-2 h-[44px] px-4 rounded-full bg-surface-container-high text-on-surface shadow-sm"
			>
				<SearchIcon className="size-5" />
				<span className="text-sm font-medium">Search</span>
			</button>
		</>
	)
}

export default function SearchTrigger({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (v: boolean) => void
}) {
	return (
		<>
			<div className="w-full flex justify-center px-4">
				<SearchTriggerInput onClick={() => setOpen(true)} />
			</div>
			<SearchIsland
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}
