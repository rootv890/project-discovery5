"use client"
import { useState } from "react"
import SearchIsland from "@/components/SearchIsland"
import SearchTrigger from "@/components/SearchTrigger"
import { Input } from "@/components/ui/input"

const BuildPage = () => {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center h-full w-full gap-2">
			<Input
				placeholder="Share your feedback..."
				className="max-w-md"
			/>
			<SearchTrigger
				open={open}
				setOpen={setOpen}
			/>
		</div>
	)
}

export default BuildPage
