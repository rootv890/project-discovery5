"use client"
import { useState } from "react"
import SearchIsland from "@/components/SearchIsland"
import SearchTrigger from "@/components/SearchTrigger"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight3 } from "iconsax-reactjs"

const BuildPage = () => {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center h-full w-full gap-2">
			<div>
				<p className="display-lg-em ">Build with Confidence</p>
				<p className="body-md">Build with Confidence</p>
			</div>
			<Input
				placeholder="Share your feedback..."
				className="max-w-md "
			/>
			<SearchTrigger
				open={open}
				setOpen={setOpen}
			/>
			<Button
				variant={"inverted"}
				size={"sm"}
				className="mt-6"
			>
				Build with Confidence
				<ArrowRight3
					className="size-7"
					variant="Bulk"
				/>
			</Button>
		</div>
	)
}

export default BuildPage
