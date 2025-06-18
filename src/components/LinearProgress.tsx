"use client"

import React from "react"
import "@material/web/progress/linear-progress.js"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type LinearProgressProps = {
	buffer?: number
	progress?: number
	indeterminate?: boolean
	max?: number
	fourColor?: boolean
	size?: "sm" | "md" | "lg"
	className?: string
	style?: React.CSSProperties

	/** Theme color for the indicator (CSS var or hex) */
	primaryColor?: string
	/** Theme color for the track/background */
	trackColor?: string
} & VariantProps<typeof linearProgressVariants>

// Size variants
const linearProgressVariants = cva("w-full", {
	variants: {
		size: {
			sm: "h-1",
			md: "h-1.5",
			lg: "h-2",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

const LinearProgress = ({
	buffer = 0,
	progress = 0,
	indeterminate = false,
	max = 1,
	fourColor = false,
	size = "md",
	className,
	style,
	primaryColor = "var(--color-primary)",
	trackColor = "var(--color-surface-container-highest)",
	...rest
}: LinearProgressProps) => {
	// Calculate pixel size based on variant
	const sizeInPx = React.useMemo(
		() => (size === "sm" ? 4 : size === "md" ? 6 : 8),
		[size]
	)

	return (
		<div
			className={cn(linearProgressVariants({ size }), className)}
			style={
				{
					"--md-linear-progress-track-height": `${sizeInPx}px`,
					"--md-linear-progress-active-indicator-height": `${sizeInPx}px`,
					"--md-linear-progress-track-shape": `${sizeInPx}px`,
					"--md-sys-color-primary": primaryColor,
					"--md-sys-color-surface-container-highest": trackColor,
					...style,
				} as React.CSSProperties
			}
		>
			{/* @ts-expect-error LinearProgress is not a valid component */}
			<md-linear-progress
				value={progress}
				buffer={buffer}
				indeterminate={indeterminate}
				max={max}
				{...(fourColor ? { "four-color": true } : {})}
				{...rest}
			/>
		</div>
	)
}

export default LinearProgress
