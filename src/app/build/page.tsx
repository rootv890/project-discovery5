"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight3, CopySuccess } from "iconsax-reactjs"

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DialogHeader,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog"
import { DeleteIcon } from "lucide-react"

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ProductCard } from "@/components/ProductCard"

const BuildPage = () => {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center h-full w-full gap-2">
			<ProductCard
				variant="elevated"
				orientation="horizontal"
				imageSrc="/figma-test.avif"
				title="Product Card"
				subtitle="Prototype and UI"
				description="This is a product card"
			/>
			<ProductCard
				variant="elevated"
				orientation="vertical"
				imageSrc="/figma-test.avif"
				title="Product Card"
				subtitle="Prototype and UI"
				description={
					<div className="flex flex-col gap-2">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
							quos.
						</p>
					</div>
				}
				footer={
					<div className="flex items-center justify-end gap-2 w-full">
						<Button
							borderType="round"
							variant="outline"
							size="xs"
						>
							More info
						</Button>
						<Button
							borderType="round"
							variant="filled"
							size="xs"
						>
							More info
						</Button>
					</div>
				}
			/>
		</div>
	)
}

export default BuildPage

export function SimpleDialog() {
	const [open, setOpen] = useState(false)
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger>
				<Button>Open</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					A dialog is a type of modal window that appears in front of app
					content to provide critical information, or prompt for a decision to
					be made.
				</DialogDescription>
				<DialogFooter>
					<Button
						size={"xs"}
						variant={"destructive"}
					>
						Cancel
						<DeleteIcon className="size-6" />
					</Button>
					<Button
						size={"xs"}
						variant={"filled"}
					>
						Next
						<ArrowRight3
							className="size-6"
							variant="Bulk"
						/>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function SimpleCard() {
	return (
		<Card
			className="w-full max-w-md"
			variant="elevated"
		>
			<CardHeader>
				<CardTitle>Project Overview</CardTitle>
				<CardDescription>
					Track your project's progress and key metrics
				</CardDescription>
				<CardAction>
					<Button
						variant="ghost"
						size="xs"
					>
						<CopySuccess
							variant="Bold"
							className="text-primary"
						/>
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">
							Tasks Completed
						</span>
						<span className="font-medium">24/36</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Team Members</span>
						<span className="font-medium">8 active</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">
							Next Milestone
						</span>
						<span className="font-medium">Dec 15, 2023</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<span className="text-sm text-muted-foreground">
					Last updated 2 hours ago
				</span>
				<Button
					variant="ghost"
					size="xs"
				>
					View Details
				</Button>
			</CardFooter>
		</Card>
	)
}
