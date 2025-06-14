"use client"

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import SearchIsland from "./SearchIsland"
import { useState } from "react"

export function SearchTriggerInput({ onClick }: { onClick: () => void }) {
	return (
		<>
			{/* Trigger styled like your SearchInput */}
			<button
				onClick={onClick}
				className={cn(
					"w-full min-w-0 py-[0.625rem] px-[1rem] h-[48px] flex outline-none transition-[color,box-shadow] max-w-md",
					"bg-surface-container-high text-on-surface-variant rounded-lg text-base font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
					"placeholder:text-muted-foreground",
					"flex items-center justify-between gap-2"
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
			<SearchTriggerInput onClick={() => setOpen(true)} />
			<SearchIsland
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}
