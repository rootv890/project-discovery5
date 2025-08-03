"use client"

import Image from "next/image"

import LikeButton from "@/components/LikeButton"
import QuickTooltip from "@/components/QuickToolTip"
import ViewsButton from "@/components/ViewsButton"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ProductCardProps } from "../../types/type"

export function VerticalProductCard({
	imageSrc,
	imageAlt = "Product image",
	title,
	subtitle,
	description,
	visitUrl,
	moreInfoUrl,
	className,
	variant = "filled",
}: ProductCardProps) {
	return (
		<Card
			variant={variant}
			className={cn(
				// Consider extracting this layout setup as a design token if reused
				"overflow-hidden min-w-[256px] w-full z-0 relative grid h-[480px] grid-rows-[0.59fr_0.41fr] gap-0 rounded-[28px]",
				"transition-all duration-300 ease-out",
				"hover:bg-surface-container-high hover:shadow-xl",
				// responsiveness
				// "sm:max-w-[280px]",
				// "md:max-w-[320px]",
				// "lg:max-w-[360px]",
				// "xl:max-w-[400px]",
				className
			)}
		>
			{/* Image section */}
			<div className="w-full px-2 pt-2 ">
				<div className="relative overflow-clip rounded-[20px] size-full">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						priority
						className="object-cover"
					/>
				</div>
			</div>

			{/* Content section */}
			<div className="flex w-full flex-col justify-center  gap-0 min-h-0">
				<CardHeader className="px-2 py-2 pb-1 flex-col items-end gap-2">
					<div className="flex justify-between items-center w-full">
						<CardTitle className="text-lg font-semibold">{title}</CardTitle>

						<div className="flex items-center gap-0 flex-shrink-0 bg-primary-container/50 rounded-md">
							<LikeButton />
							<ViewsButton />
						</div>
					</div>
				</CardHeader>

				<CardContent className="px-2 body-lg line-clamp-3 text-on-surface-variant ">
					<QuickTooltip
						label={description.toString()}
						delayDuration={2000}
					>
						<CardDescription className="text-sm line-clamp-2">
							{description ?? "No Description provieded"}
						</CardDescription>
					</QuickTooltip>
				</CardContent>

				<CardFooter className="px-4 pt-2 pb-4 shrink-0 flex items-center justify-end gap-2">
					<Button
						borderType="round"
						variant="outline"
						size="sm"
						disabled={!moreInfoUrl}
					>
						More Info
					</Button>
					<Button
						borderType="round"
						variant="filled"
						size="sm"
						disabled={!visitUrl}
					>
						Visit Site
					</Button>
				</CardFooter>
			</div>
		</Card>
	)
}
