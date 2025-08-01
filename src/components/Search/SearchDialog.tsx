"use client"

import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Command } from "cmdk"
import { SearchIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"
import { DialogTitle } from "../ui/dialog"

export interface SearchSuggestion {
	id: string
	title: string
	icon?: string
	label?: string
	onSelect?: () => void
}

interface SearchDialogProps {
	open: boolean
	setOpen: (open: boolean) => void
	onSearch?: (query: string) => void
	placeholder?: string
	suggestions?: SearchSuggestion[]
}

const defaultSuggestions: SearchSuggestion[] = [
	{ id: "linear", title: "Linear", icon: "🌀", label: "Application" },
	{ id: "figma", title: "Figma", icon: "🎨", label: "Application" },
	{ id: "slack", title: "Slack", icon: "💬", label: "Application" },
	{ id: "clipboard", title: "Clipboard History", icon: "📋", label: "Command" },
	{ id: "import", title: "Import Extension", icon: "📦", label: "Command" },
]

export default function SearchDialog({
	open,
	setOpen,
	onSearch,
	placeholder = "Search for apps and collections...",
	suggestions = defaultSuggestions,
}: SearchDialogProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(!open)
			} else if (e.key === "Escape") {
				setOpen(false)
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [open, setOpen])

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
					<VisuallyHidden>
						<DialogTitle>
							Search for apps, collections, and commands
						</DialogTitle>
					</VisuallyHidden>

					<motion.div
						ref={containerRef}
						tabIndex={-1}
						onBlur={handleBlur}
						initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
						transition={{ duration: 0.25 }}
						className="w-full max-w-xl rounded-xl border border-surface-container-low bg-surface-container-high shadow-md text-on-surface"
					>
						{/* Search Input */}
						<div className="flex items-center gap-2 p-4 border-b border-surface-container-low">
							<SearchIcon className="size-5 text-on-surface-variant" />
							<Command.Input
								className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant"
								autoFocus
								placeholder={placeholder}
								onValueChange={onSearch}
							/>
							<kbd className="text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
								ESC
							</kbd>
						</div>

						{/* Results */}
						<Command.List className="max-h-80 px-2 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-on-surface-variant/40 scrollbar-track-transparent">
							<Command.Empty className="px-4 py-6 text-center text-on-surface-variant">
								No results found.
							</Command.Empty>

							<Command.Group
								heading="Suggestions"
								className="px-2"
							>
								{suggestions.map((suggestion) => (
									<SearchItem
										key={suggestion.id}
										icon={suggestion.icon}
										label={suggestion.label}
										onSelect={() => {
											suggestion.onSelect?.()
											setOpen(false)
										}}
									>
										{suggestion.title}
									</SearchItem>
								))}
							</Command.Group>
						</Command.List>

						{/* Footer */}
						<div className="flex items-center justify-between border-t border-surface-container-low px-4 py-2 text-xs text-on-surface-variant">
							<span>Open Application ↩</span>
							<span>Actions ⌘K</span>
						</div>
					</motion.div>
				</Command.Dialog>
			)}
		</AnimatePresence>
	)
}

interface SearchItemProps {
	children: React.ReactNode
	icon?: string
	label?: string
	onSelect?: () => void
}

function SearchItem({ children, icon, label, onSelect }: SearchItemProps) {
	return (
		<Command.Item
			onSelect={onSelect}
			className={cn(
				"flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-md transition-colors",
				"text-on-surface-variant",
				"hover:bg-secondary-container data-[cmdk-selected=true]:bg-secondary-container"
			)}
		>
			<div className="flex items-center gap-3">
				{icon && <span className="text-lg">{icon}</span>}
				<span>{children}</span>
			</div>
			{label && (
				<span className="text-xs text-on-surface-variant/70">{label}</span>
			)}
		</Command.Item>
	)
}
