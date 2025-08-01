"use client"

import { cn } from "@/lib/utils"
import { Command, SearchIcon, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import SearchDialog from "./SearchDialog"

interface SearchTriggerProps {
	className?: string
	placeholder?: string
	onSearch?: (query: string) => void
	variant?: "full" | "compact" | "icon-only"
}

export default function SearchTrigger({
	className,
	placeholder,
	onSearch,
	variant = "full",
}: SearchTriggerProps) {
	const [open, setOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = () => setOpen(true)
	let modifierKeyPrefix = "⌘"
	useEffect(() => {
		modifierKeyPrefix =
			navigator.platform.startsWith("Mac") ||
			// @ts-expect-error new experimental feature
			navigator.userAgentData.platform === "iPhone"
				? "⌘" // command key
				: "^" // control key
	}, [])

	return (
		<>
			{variant === "full" && (
				<button
					onClick={handleClick}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className={cn(
						"group relative flex w-full max-w-xl h-[56px] px-2 pl-4  py-2 rounded-2xl overflow-hidden",
						"bg-gradient-to-r from-surface-container-high/80 to-surface-container-high/60",
						"backdrop-blur-xl border border-outline-variant/20",
						"shadow-lg hover:shadow-2xl transition-all duration-500 ease-out",
						"items-center justify-between gap-4",
						"hover:scale-[1.02] hover:translate-y-1",
						"before:absolute before:inset-0 before:bg-gradient-to-r",
						"before:from-primary/5 before:via-secondary/5 before:to-tertiary/5",
						"before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
						className
					)}
				>
					{/* Animated background glow */}
					<div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

					{/* Shimmer effect */}
					<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

					<div className="relative flex items-center gap-4 flex-1 w-full">
						<div className="flex items-center gap-3 w-full">
							<div className="relative">
								<Sparkles
									className={cn(
										"size-5 text-primary transition-all duration-300",
										isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
									)}
								/>
								{isHovered && (
									<div className="absolute inset-0 animate-ping">
										<Sparkles className="size-5 text-primary/50" />
									</div>
								)}
							</div>
							<div className="flex items-center justify-between w-full ">
								<span className="text-on-surface/90 font-medium text-md">
									Search for anything...
								</span>
								<kbd
									className="text-xs text-on-surface-variant bg-surface-container-low flex items-center justify-center gap-2 px-1 py.5
                 rounded"
								>
									<span className="text-lg">{modifierKeyPrefix}</span>
									<span>K</span>
								</kbd>
							</div>
						</div>
					</div>

					<div className="relative">
						<Button
							size={"sm"}
							variant={"inverted"}
							className={cn(
								"p-2 text-on-primary rounded-xl",
								"shadow-lg transition-all duration-300 group-hover:shadow-primary/25",
								"group-hover:scale-110 group-hover:rotate-3"
							)}
						>
							<SearchIcon className="size-5" />
						</Button>
						{/* Pulsing ring effect */}
						<div className="absolute inset-0 rounded-xl border-2 border-primary/30 scale-110 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
					</div>
				</button>
			)}

			{variant === "compact" && (
				<button
					onClick={handleClick}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					aria-label="Search"
					className={cn(
						"group relative flex items-center gap-3 h-[52px] px-5 rounded-xl overflow-hidden",
						"bg-gradient-to-r from-surface-container-high/80 to-surface-container-high/60",
						"backdrop-blur-xl border border-outline-variant/20",
						"shadow-md hover:shadow-xl transition-all duration-300 ease-out",
						"hover:scale-105 hover:-translate-y-0.5",
						"before:absolute before:inset-0 before:bg-gradient-to-r",
						"before:from-primary/5 before:to-secondary/5",
						"before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
						className
					)}
				>
					{/* Animated background */}
					<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					<div className="relative">
						<SearchIcon
							className={cn(
								"size-5 text-primary transition-all duration-300",
								isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
							)}
						/>
					</div>
					<span className="relative text-sm font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
						Search
					</span>

					{/* Shine effect */}
					<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
				</button>
			)}

			{variant === "icon-only" && (
				<button
					onClick={handleClick}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					aria-label="Search"
					className={cn(
						"group relative flex items-center justify-center size-12 rounded-xl overflow-hidden",
						"bg-gradient-to-br from-surface-container-high/80 to-surface-container-high/60",
						"backdrop-blur-xl border border-outline-variant/20",
						"shadow-md hover:shadow-xl transition-all duration-300 ease-out",
						"hover:scale-110 hover:-translate-y-1 hover:rotate-3",
						"before:absolute before:inset-0 before:bg-gradient-to-br",
						"before:from-primary/10 before:to-secondary/10",
						"before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
						className
					)}
				>
					{/* Pulsing background */}
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />

					{/* Shimmer effect */}
					<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

					{/* Orbital rings */}
					<div className="absolute inset-0 border border-primary/20 rounded-xl scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
					<div className="absolute inset-0 border border-primary/10 rounded-xl scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
				</button>
			)}

			<SearchDialog
				open={open}
				setOpen={setOpen}
				onSearch={onSearch}
				placeholder={placeholder}
			/>
		</>
	)
}
