import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import SearchIsland from "./SearchIsland"

/**
 * Renders a responsive search trigger button that adapts its appearance for desktop and mobile screens.
 *
 * On desktop, displays a full-width search bar styled as a rounded button with placeholder text and a search icon. On mobile, shows a compact pill-shaped button with a search icon and label. Invokes the provided `onClick` callback when either button is clicked.
 *
 * @param className - Additional CSS classes to apply to the desktop button for custom styling
 * @param onClick - Callback function invoked when the search trigger is clicked
 */
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

/**
 * Displays a centered search trigger button and manages the visibility of the search interface.
 *
 * Renders a search button that, when clicked, opens the search interface by setting the `open` state to `true`. The search interface is controlled via the `open` and `setOpen` props.
 *
 * @param open - Whether the search interface is currently visible
 * @param setOpen - Function to update the visibility state of the search interface
 */
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
