// components/ToolCard.tsx
"use client"

import { cn } from "@/lib/utils"
import React from "react"

type HeroToolCardProps = {
	position: "left" | "right"
	className?: string // e.g., "bottom-[4vh]" or "top-12"
	children: React.ReactNode
}

const HeroToolCard = ({ position, className, children }: HeroToolCardProps) => {
	const offset = "55vw"
	const leftCalc =
		position === "left" ? `left-[calc(-40%)]` : `left-[calc(50%-${offset})]`
	// : `left-[calc(50%+${offset})]`

	return (
		<div
			className={cn(
				`absolute origin-center -translate-x-1/2 rounded-lg bg-on-primary w-fit max-w-[256px] p-4`,
				className
			)}
		>
			{children}
		</div>
	)
}

export default HeroToolCard
