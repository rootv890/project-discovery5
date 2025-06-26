import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface QuickTooltipProps {
	label: string
	children: React.ReactNode
	side?: "top" | "bottom" | "left" | "right"
	sideOffset?: number
	delayDuration?: number
}

const QuickTooltip = ({
	label,
	children,
	side = "top",
	sideOffset = 6,
	delayDuration = 0,
}: QuickTooltipProps) => {
	return (
		<Tooltip delayDuration={delayDuration}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				sideOffset={sideOffset}
			>
				{label}
			</TooltipContent>
		</Tooltip>
	)
}

export default QuickTooltip
