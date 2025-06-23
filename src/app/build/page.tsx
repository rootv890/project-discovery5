"use client"

import { ProductCard } from "@/components/ProductCard"
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
import { CopySuccess } from "iconsax-reactjs"

import React from "react"

const page = () => {
	return (
		<div className="flex flex-col gap-4 h-screen w-full items-center justify-center p-6 bg-surface-variant display-lg-em">
			<ProductCard
				title="Rive"
				subtitle="Real-time interactive animations"
				description="Rive is a powerful animation tool for creating real-time, interactive motion graphics for apps, games, and websites—all without writing code."
				imageSrc="/placeholder-image.png" // replace with your local or remote image
				variant="filled"
				orientation="vertical"
				visitUrl="b"
				moreInfoUrl="a"
			/>
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
