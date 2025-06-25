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
import { ProductCardProps } from "../../types/type"
import { cn } from "@/lib/utils"

export function HorizontalProductCard(props: ProductCardProps) {
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
				"overflow-clip w-full max-w-[400px] h-[140px] flex flex-row gap-1 rounded-2xl relative z-0 ",
				className
			)}
			{...rest}
		>
			{/* IMAGE SECTION */}
			<div className="relative w-[40%] bg-rose-400 h-full">
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					priority
					className="object-cover object-center"
				/>
			</div>

			{/* TEXT SECTION */}
			<div className="flex flex-col flex-[3] justify-between w-[60%] h-full p-3 gap-1 text-foreground ">
				{/* HEADER */}
				<div className="space-y-0">
					<CardTitle className="text-base font-semibold truncate">
						{title}
					</CardTitle>
					{subtitle && (
						<QuickTooltip label={subtitle}>
							<CardDescription className="text-base truncate text-muted-foreground ">
								{subtitle}
							</CardDescription>
						</QuickTooltip>
					)}
				</div>

				{/* FOOTER */}
				<CardFooter className="p-0  flex flex-col justify-between items-start gap-1 ">
					<div className="flex items-center gap-2 -ml-2  bg-primary-container/50 rounded-md">
						<LikeButton />
						<ViewsButton />
					</div>
					<div className="flex gap-2 justify-end w-full">
						{moreInfoUrl && (
							<Button
								size="xs"
								variant="outline"
								borderType="round"
							>
								More Info
							</Button>
						)}
						{visitUrl && (
							<Button
								size="xs"
								variant="filled"
								borderType="round"
							>
								Visit Site
							</Button>
						)}
					</div>
				</CardFooter>
			</div>
		</Card>
	)
}
