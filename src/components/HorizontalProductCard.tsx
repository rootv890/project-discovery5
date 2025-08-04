"use client"

import LikeButton from "@/components/LikeButton"
import QuickTooltip from "@/components/QuickToolTip"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import ViewsButton from "@/components/ViewsButton"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ProductCardProps } from "../../types/type"

export function HorizontalProductCard({
	imageSrc,
	imageAlt = "Product image",
	title,
	subtitle,
	description,
	visitUrl,
	moreInfoUrl,
	className,
	variant = "filled",
	...rest
}: ProductCardProps) {
	const hasImage = !!imageSrc

	return (
		<Card
			variant={variant}
			className={cn(
				"group relative overflow-hidden",
				"w-full max-w-[580px] h-[180px]",
				"bg-surface-container border-0",
				"rounded-[32px]",
				"transition-all duration-300 ease-out",
				"hover:bg-surface-container-high ",
				"flex flex-row gap-0",
				className
			)}
			{...rest}
		>
			{/* IMAGE SECTION */}

			<div className="relative w-[40%] h-full  p-3">
				<div className="relative size-full rounded-[20px] bg-surface-container-low overflow-hidden">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
					/>
				</div>
			</div>

			{/* CONTENT SECTION */}
			<div className="flex   w-[60%] flex-col justify-center gap-1 items-start py-6 pr-6 pl-2">
				{/* HEADER */}
				<div className="">
					<div className="flex items-start flex-col justify-center ">
						<div className="flex-1 flex justify-between items-center space-y-1">
							<CardTitle className="text-xl font-semibold text-on-surface leading-tight">
								{title}
							</CardTitle>

							<div className="flex items-center gap-0 flex-shrink-0 bg-primary-container/50 rounded-md ml-4">
								<LikeButton />
								<ViewsButton />
							</div>
						</div>

						{/* ENGAGEMENT STATS */}
						{subtitle && (
							<p className="text-sm line-clamp-2 text-on-surface-variant font-medium">
								{subtitle}
							</p>
						)}
					</div>
				</div>

				{/* FOOTER BUTTONS */}
				<div className="flex items-center w-full justify-end gap-3 mt-4">
					<Button
						borderType="round"
						variant="outline"
						size="sm"
						disabled={!moreInfoUrl}
						className="h-10 px-4 text-sm font-medium"
					>
						More Info
					</Button>
					<Button
						borderType="round"
						variant="filled"
						size="sm"
						disabled={!visitUrl}
						className="h-10 px-4 text-sm font-semibold"
					>
						Visit Site
					</Button>
				</div>
			</div>
		</Card>
	)
}
