"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import LikeButton from "./LikeButton"
import ViewsButton from "./ViewsButton"

import QuickTooltip from "./QuickToolTip"

type ProductCardProps = React.ComponentProps<typeof Card> & {
	variant?: "elevated" | "filled" | "outlined"
	orientation?: "vertical" | "horizontal"
	imageSrc: string
	imageAlt?: string
	title: string
	subtitle?: string
	description?: React.ReactNode | string
	visitUrl?: string
	moreInfoUrl?: string
}

export function ProductCard({
	orientation = "vertical",
	imageSrc,
	imageAlt = "Product image",
	title,
	subtitle,
	description,
	visitUrl,
	moreInfoUrl,
	className,
	variant = "filled",
	...props
}: ProductCardProps) {
	const isHorizontal = orientation === "horizontal"

	return (
		<Card
			variant={variant}
			className={cn(
				"overflow-hidden w-[344px] rounded-[28px]",
				isHorizontal
					? "flex-row-reverse h-[80px]" // unchanged for horizontal
					: "grid h-[440px] gap-3 grid-rows-[0.59fr_0.41fr]", // converted to grid
				className
			)}
			{...props}
		>
			{/* Image */}
			{isHorizontal ? (
				<div className="relative w-2/6 h-36 shrink-0">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						priority
						className="object-cover object-center"
					/>
				</div>
			) : (
				<div className=" w-full px-2 pt-2 overflow-clip  ">
					<div className="relative overflow-clip rounded-[20px] size-full ">
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							priority
							className="object-cover"
						/>
					</div>
				</div>
			)}

			{/* Content */}
			<div
				className={cn(
					"flex flex-col justify-center gap-0",
					isHorizontal ? "flex-1 pt-2" : "min-h-0"
				)}
			>
				<CardHeader
					className={cn(
						"px-4 py-2 flex items-start justify-between gap-2",
						!isHorizontal && "pb-1"
					)}
				>
					<div className="flex flex-col flex-[3] min-w-0">
						<CardTitle className="title-lg-em leading-none">{title}</CardTitle>
						{subtitle && !isHorizontal && (
							<QuickTooltip
								label={subtitle}
								delayDuration={1000}
							>
								<CardDescription className="body-md mt-1 truncate text-on-surface-variant">
									{subtitle}
								</CardDescription>
							</QuickTooltip>
						)}
					</div>

					<div className="flex items-center justify-start gap-2 flex-shrink-0 ">
						{/* Like Buttons */}
						<LikeButton />
						<ViewsButton />
					</div>
				</CardHeader>

				{description && (
					<CardContent
						className={cn(
							"px-4 body-md line-clamp-3 text-on-surface-variant",
							isHorizontal ? " min-h-0 py-1" : ""
						)}
					>
						<QuickTooltip
							label={description.toString()}
							delayDuration={2000}
						>
							<CardDescription>{description}</CardDescription>
						</QuickTooltip>
					</CardContent>
				)}
				<CardFooter className="px-4 pt-2 pb-4 shrink-0 flex items-center justify-end gap-2">
					<Button
						borderType="round"
						variant="outline"
						size="xs"
						disabled={!moreInfoUrl}
					>
						More Info
					</Button>
					<Button
						borderType="round"
						variant="filled"
						size="xs"
						disabled={!visitUrl}
					>
						Visit Site
					</Button>
				</CardFooter>
			</div>
		</Card>
	)
}
