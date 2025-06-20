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
			{/* 🔍 Full input-like trigger on large screens */}
			<button
				onClick={onClick}
				className={cn(
					"hidden md:flex w-full py-[0.625rem] px-[1rem] h-[48px] outline-none transition-[color,box-shadow]",
					"bg-surface-container-high text-on-surface-variant rounded-lg text-base font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
					"placeholder:text-muted-foreground",
					"items-center justify-between gap-2",
					className
				)}
			>
				<div className="flex items-center gap-2 text-on-surface-variant">
					<SearchIcon className="size-5" />
					<span className="text-sm text-on-surface-variant">
						Search for apps and collections...
					</span>
				</div>
				<kbd className="text-xs text-on-surface-variant bg-surface-container-low p-1 px-2 rounded">
					cmdk + k
				</kbd>
			</button>

			{/* 🔍 Icon-only button on small screens */}
			<button
				onClick={onClick}
				aria-label="Search"
				className="flex md:hidden items-center justify-center size-10 rounded-md bg-surface-container-high text-on-surface-variant shadow-xs"
			>
				<SearchIcon className="size-5" />
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
			<SearchTriggerInput
				onClick={() => setOpen(true)}
				// responsive width
				className="min-w-sm lg:min-w-lg md:min-w-md"
			/>
			<SearchIsland
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}
