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

type ProductCardProps = React.ComponentProps<typeof Card> & {
	variant?: "elevated" | "filled" | "outlined"
	orientation?: "vertical" | "horizontal"
	imageSrc: string
	imageAlt?: string
	title: string
	subtitle?: string
	description?: React.ReactNode | string
	footer?: React.ReactNode
}

export function ProductCard({
	orientation = "vertical",
	imageSrc,
	imageAlt = "Product image",
	title,
	subtitle,
	description,
	footer,
	className,
	variant = "filled",
	...props
}: ProductCardProps) {
	const isHorizontal = orientation === "horizontal"

	return (
		<Card
			variant={variant}
			className={cn(
				"overflow-hidden w-[320px]",
				isHorizontal ? "flex-row-reverse  h-[80px]" : "flex-col h-[400px]",
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
						className="object-cover object-center "
					/>
				</div>
			) : (
				<div className="relative w-full h-1/2 shrink-0">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						priority
						className="object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div
				className={cn(
					"flex flex-col justify-center gap-0",
					isHorizontal ? "flex-1 pt-2" : "flex-1 min-h-0"
				)}
			>
				<CardHeader className={cn("px-4 pt-4", !isHorizontal && "pb-1")}>
					<CardTitle className="title-md-em">{title}</CardTitle>
					{subtitle && !isHorizontal && (
						<CardDescription className="text-xs">{subtitle}</CardDescription>
					)}
				</CardHeader>

				{description && (
					<CardContent
						className={cn(
							"px-4 body-md",
							isHorizontal
								? "flex-1 min-h-0 overflow-y-auto py-1"
								: "flex-1 min-h-0 overflow-y-auto pb-2"
						)}
					>
						<CardDescription>{description}</CardDescription>
					</CardContent>
				)}

				{footer && (
					<CardFooter className="px-4 pt-2 pb-4 shrink-0">{footer}</CardFooter>
				)}
			</div>
		</Card>
	)
}
