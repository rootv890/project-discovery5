"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface SeamlessGridProps {
	cellSize?: number
	className?: string
	lineColor?: string
	showVignette?: boolean
	vignetteColor?: string
}

const GridLines = ({
	cellSize = 120,
	className,
	lineColor = "#fae0ff40",
	showVignette = true,
	vignetteColor = "#fff",
}: SeamlessGridProps) => {
	const gridStyle = {
		"--line-color": lineColor,
		backgroundSize: `${cellSize}px ${cellSize}px`,
		backgroundImage: `
      linear-gradient(to right, var(--line-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--line-color) 1px, transparent 1px)
    `,
		pointerEvents: "none",
		zIndex: 1,
	} as React.CSSProperties

	return (
		<div className={cn("absolute inset-0 w-full h-full", className)}>
			{/* Grid Layer */}
			<div
				style={gridStyle}
				className="absolute inset-0"
			/>

			{/* Vignette Layer */}
			{showVignette && (
				<div
					className="absolute inset-0 pointer-events-none z-10"
					style={{
						background: `radial-gradient(ellipse at center, transparent 60%, ${vignetteColor} 100%)`,
						mixBlendMode: "multiply",
					}}
				/>
			)}
		</div>
	)
}

export default GridLines
