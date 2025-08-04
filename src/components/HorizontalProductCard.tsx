"use client"

import LikeButton from "@/components/LikeButton"
import QuickTooltip from "@/components/QuickToolTip"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import ViewsButton from "@/components/ViewsButton"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ProductCardProps } from "../../types/type"

/**
 * Displays a horizontal product card with an image, title, subtitle, and action buttons.
 *
 * Renders a visually styled card featuring a product image, title, optional subtitle, and interactive buttons for liking, viewing stats, and accessing more information or visiting an external site. The "More Info" and "Visit Site" buttons are disabled if their respective URLs are not provided.
 *
 * @param imageSrc - The URL of the product image to display
 * @param imageAlt - Alternative text for the product image
 * @param title - The main title of the product
 * @param subtitle - An optional subtitle or secondary description
 * @param description - An optional detailed description of the product
 * @param visitUrl - URL to visit the product's external site
 * @param moreInfoUrl - URL for more information about the product
 * @param className - Additional CSS classes for custom styling
 * @param variant - Visual style variant for the card
 * @returns A React element representing the horizontal product card
 */
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
