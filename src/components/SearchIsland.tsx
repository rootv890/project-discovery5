"use client"

import { Command } from "cmdk"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { SearchIcon } from "lucide-react"
import { open } from "fs"

// To:
const SearchIsland = ({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (v: boolean) => void
}) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(!open)
			} else if (e.key === "Escape") {
				setOpen(false)
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [open, setOpen])

	// Detect outside focus
	const handleBlur = (e: React.FocusEvent) => {
		const nextFocused = e.relatedTarget as HTMLElement | null
		if (nextFocused && containerRef.current?.contains(nextFocused)) return
		setOpen(false)
	}

	return (
		<AnimatePresence>
			{open && (
				<Command.Dialog
					open={open}
					onOpenChange={setOpen}
					className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-transparent"
				>
					<motion.div
						ref={containerRef}
						tabIndex={-1}
						onBlur={handleBlur}
						initial={{ opacity: 0, scale: 0.96 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.96 }}
						transition={{ duration: 0.15 }}
						className="w-full max-w-xl rounded-xl border border-surface-container-low bg-surface-container-high shadow-md text-on-surface"
					>
						{/* MATERIAL INPUT STYLE HERE */}
						<SearchInput open={open} />
						<Command.List
							className={cn(
								"max-h-80 px-4 py-2 overflow-y-auto",
								// scrollbar customization
								" scrollbar-thumb-on-surface-variant/40 scrollbar-track-transparent scrollbar-thin"
							)}
						>
							<Command.Empty className="px-4 py-3 text-lg text-on-surface-variant text-center font-medium">
								No results found.
							</Command.Empty>
							<Command.Group
								heading="Suggestions"
								className="pt-2"
							>
								<MaterialCommandItem
									icon="🌀"
									label="Application"
									onSelect={() => setOpen(false)}
								>
									Linear
								</MaterialCommandItem>
								<MaterialCommandItem
									icon="🎨"
									label="Application"
								>
									Figma
								</MaterialCommandItem>
								<MaterialCommandItem
									icon="💬"
									label="Application"
								>
									Slack
								</MaterialCommandItem>
							</Command.Group>

							<Command.Group
								heading="Commands"
								className="pt-4"
							>
								<MaterialCommandItem
									icon="📋"
									label="Command"
								>
									Clipboard History
								</MaterialCommandItem>
								<MaterialCommandItem
									icon="📦"
									label="Command"
								>
									Import Extension
								</MaterialCommandItem>
							</Command.Group>
						</Command.List>

						{/* Footer bar */}
						<div className="flex items-center justify-between border-t border-surface-container-low px-4 py-2 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								Open Application ↩
							</span>
							<span className="flex items-center gap-1">Actions ⌘K</span>
						</div>
					</motion.div>
				</Command.Dialog>
			)}
		</AnimatePresence>
	)
}

const MaterialCommandItem = ({
	children,
	icon,
	label,
	onSelect,
}: {
	children: React.ReactNode
	icon?: string
	label?: string
	onSelect?: () => void
}) => {
	return (
		<Command.Item
			onSelect={onSelect}
			className={cn(
				"flex items-center justify-between px-4 py-3 text-sm cursor-pointer rounded-md transition-colors",
				"text-on-surface-variant",
				"hover:bg-secondary-container data-[cmdk-selected=true]:bg-secondary-container"
			)}
		>
			<div className="flex items-center gap-3">
				{icon && <span className="text-xl">{icon}</span>}
				<span>{children}</span>
			</div>
			{label && <span className="text-xs text-muted-foreground">{label}</span>}
		</Command.Item>
	)
}

export default SearchIsland

// focus-visible:ring-primary/50 focus-visible:ring-t-[3px]

export function SearchInput({ open }: { open: boolean }) {
	return (
		<div
			className={cn(
				"w-full min-w-0 py-[0.625rem] px-[1rem] h-[48px] flex outline-none transition-[color,box-shadow]",
				"bg-surface-container-high text-on-surface-variant  rounded-t-lg text-base font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
				"placeholder:text-muted-foreground focus-visible:border-primary ",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				" flex items-center justify-center gap-2"
			)}
		>
			<SearchIcon className="size-5 text-on-surface-variant" />
			<Command.Input
				className="w-full  focus-visible:border-primary focus-visible:ring-0 outline-none text-on-surface-variant"
				autoFocus
				placeholder="Search for apps and collections..."
			/>
			<pre className="text-xs text-on-surface-variant bg-surface-container-low  p-0.5 rounded-xs">
				{open ? "cmdk + k" : "ESC"}
			</pre>
		</div>
	)
}
