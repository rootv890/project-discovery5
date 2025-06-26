"use client"

import { HorizontalProductCard } from "@/components/HorizontalProductCard"
import { Button } from "@/components/ui/button"
import {
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	Card,
} from "@/components/ui/card"
import { VerticalProductCard } from "@/components/VerticalProductCard"
import { useFetchToolById } from "@/query-manager/hooks/useFetchTools"
import { error } from "console"
import { CopySuccess } from "iconsax-reactjs"

import React from "react"
import toast from "react-hot-toast"

const page = () => {
	const { data, isLoading, status, isPlaceholderData, refetch, isError } =
		useFetchToolById("t_C0Pmn3")
	console.log(!isLoading ? data : "L")
	if (isError || (!isLoading && !data)) {
		toast.error("Something went wrong")
	}
	return (
		<div className="gap-4 h-screen w-full items-center justify-center p-6 bg-surface-variant display-lg-em grid grid-cols-1 place-items-center">
			{data?.tool && (
				<HorizontalProductCard
					title={data.tool.name}
					subtitle="Real-time UI design tool"
					description={data.tool.description}
					imageSrc={data.tool.imageUrl as string}
					variant="filled"
					visitUrl={"www.figma.com"}
					moreInfoUrl="a"
				/>
			)}
			{data?.tool && (
				<VerticalProductCard
					title={data.tool.name}
					subtitle="Real-time UI design tool"
					description={data.tool.description}
					imageSrc={data.tool.imageUrl as string}
					variant="filled"
					visitUrl={"www.figma.com"}
					moreInfoUrl="a"
				/>
			)}
		</div>
	)
}

export default page

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
