"use client"

import Image from "next/image"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LikeButton from "@/components/LikeButton"
import ViewsButton from "@/components/ViewsButton"
import QuickTooltip from "@/components/QuickToolTip"

import { cn } from "@/lib/utils"
import { ProductCardProps } from "../../types/type"

export function VerticalProductCard(props: ProductCardProps) {
	const {
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
	} = props

	return (
		<Card
			variant={variant}
			className={cn(
				"overflow-hidden w-full min-w-[256px] max-w-[344px] z-0 relative grid h-[440px] gap-3 grid-rows-[0.59fr_0.41fr] rounded-[28px]",
				className
			)}
			{...rest}
		>
			<div className="w-full px-2 pt-2">
				<div className="relative overflow-clip rounded-[20px] size-full">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						priority
						className="object-cover z-0"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-center gap-0 min-h-0">
				<CardHeader className="px-4 py-2 flex gap-2 pb-1">
					<div className="flex flex-col flex-[3] min-w-0">
						<CardTitle className="title-lg-em">{title}</CardTitle>
						{subtitle && (
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
					<div className="flex items-center justify-start gap-0 flex-shrink-0 bg-primary-container/50 rounded-md">
						<LikeButton />
						<ViewsButton />
					</div>
				</CardHeader>

				{description && (
					<CardContent className="px-4 body-lg line-clamp-3 text-on-surface-variant">
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
