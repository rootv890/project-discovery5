"use client"

import React from "react"
import "@material/web/progress/circular-progress.js"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const circularProgressVariants = cva("inline-block", {
	variants: {
		size: {
			sm: "w-6 h-6",
			md: "w-8 h-8",
			lg: "w-10 h-10",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

type CircularProgressProps = {
	indeterminate?: boolean
	progress?: number
	fourColor?: boolean
	size?: "sm" | "md" | "lg"
	className?: string
	style?: React.CSSProperties

	// Themed token overrides
	activeIndicatorColor?: string
	activeIndicatorWidth?: string
	customSizePx?: string // Diameter in px, like "40px"

	// For four-color mode
	fourColorOne?: string
	fourColorTwo?: string
	fourColorThree?: string
	fourColorFour?: string
} & VariantProps<typeof circularProgressVariants>

const CircularProgress = ({
	indeterminate = false,
	progress = 0,
	fourColor = false,
	size,
	className,
	style,
	activeIndicatorColor = "var(--color-primary)",
	activeIndicatorWidth,
	customSizePx,
	fourColorOne,
	fourColorTwo,
	fourColorThree,
	fourColorFour,
	...rest
}: CircularProgressProps) => {
	const mergedStyle: React.CSSProperties = {
		...(activeIndicatorColor && {
			"--md-circular-progress-active-indicator-color": activeIndicatorColor,
		}),
		...(activeIndicatorWidth && {
			"--md-circular-progress-active-indicator-width": activeIndicatorWidth,
		}),
		...(customSizePx && {
			"--md-circular-progress-size": customSizePx,
		}),
		...(fourColorOne && {
			"--md-circular-progress-four-color-active-indicator-one-color":
				fourColorOne,
		}),
		...(fourColorTwo && {
			"--md-circular-progress-four-color-active-indicator-two-color":
				fourColorTwo,
		}),
		...(fourColorThree && {
			"--md-circular-progress-four-color-active-indicator-three-color":
				fourColorThree,
		}),
		...(fourColorFour && {
			"--md-circular-progress-four-color-active-indicator-four-color":
				fourColorFour,
		}),
		...style,
	}

	return (
		<div
			className={cn(circularProgressVariants({ size }), className)}
			style={mergedStyle}
		>
			{/* @ts-expect-error CircularProgress is not a valid component */}
			<md-circular-progress
				// must be value not progress
				value={progress}
				indeterminate={indeterminate}
				{...(fourColor ? { "four-color": true } : {})}
				{...rest}
			/>
		</div>
	)
}

export default CircularProgress
