import { cn } from "@/lib/utils"
import * as React from "react"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "grid" | "masonry" | "flex"
	cols?: {
		default?: number
		sm?: number
		md?: number
		lg?: number
		xl?: number
		"2xl"?: number
	}
	gap?: "none" | "sm" | "md" | "lg" | "xl"
	aspectRatio?: "square" | "video" | "portrait" | "auto"
}

const gapClasses = {
	none: "gap-0",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8",
}

const getGridCols = (cols: ResponsiveGridProps["cols"] = {}) => {
	const {
		default: defaultCols = 1,
		sm = 2,
		md = 3,
		lg = 4,
		xl = 5,
		"2xl": xl2 = 6,
	} = cols

	return cn(
		`grid-cols-${defaultCols}`,
		`sm:grid-cols-${sm}`,
		`md:grid-cols-${md}`,
		`lg:grid-cols-${lg}`,
		`xl:grid-cols-${xl}`,
		`2xl:grid-cols-${xl2}`
	)
}

export function ResponsiveGrid({
	children,
	className,
	variant = "grid",
	cols,
	gap = "md",
	aspectRatio = "auto",
	...props
}: ResponsiveGridProps) {
	const gridCols = getGridCols(cols)
	const gapClass = gapClasses[gap]

	if (variant === "flex") {
		return (
			<div
				className={cn(
					"flex flex-wrap items-start justify-start",
					gapClass,
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}

	if (variant === "masonry") {
		return (
			<div
				className={cn(
					"columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6",
					gapClass,
					"space-y-4",
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}

	return (
		<div
			className={cn(
				"grid w-full",
				gridCols,
				gapClass,
				aspectRatio === "square" && "[&>*]:aspect-square",
				aspectRatio === "video" && "[&>*]:aspect-video",
				aspectRatio === "portrait" && "[&>*]:aspect-[3/4]",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

// Specialized container for product cards with dynamic layout
interface ProductGridProps
	extends Omit<ResponsiveGridProps, "variant" | "cols" | "gap"> {
	cardType?: "horizontal" | "vertical" | "mixed"
	minCardWidth?: number
	maxCardWidth?: number
	preferredGap?: number
}

export function ProductGrid({
	children,
	className,
	cardType = "vertical",
	minCardWidth,
	maxCardWidth,
	preferredGap = 16,
	...props
}: ProductGridProps) {
	// Default card widths based on card type
	const getDefaultCardWidths = () => {
		switch (cardType) {
			case "horizontal":
				return { min: 400, max: 500 }
			case "vertical":
				return { min: 320, max: 400 }
			case "mixed":
			default:
				return { min: 400, max: 420 }
		}
	}

	const defaults = getDefaultCardWidths()
	const finalMinWidth = minCardWidth || defaults.min
	const finalMaxWidth = maxCardWidth || defaults.max

	// Calculate optimal columns based on container width
	const calculateColumns = (containerWidth: number) => {
		if (containerWidth <= 0) return 1

		const gap = preferredGap

		// Calculate how many cards can actually fit without being too narrow
		const totalGapWidth = (6 - 1) * gap // Max possible gaps
		const availableWidth = containerWidth - totalGapWidth
		const maxPossibleColumns = Math.floor(availableWidth / finalMinWidth)

		// Start with 1 column and increase only if cards won't be too narrow
		let optimalColumns = 1

		for (let cols = 1; cols <= Math.min(maxPossibleColumns, 6); cols++) {
			const currentGapWidth = (cols - 1) * gap
			const availableWidthForCards = containerWidth - currentGapWidth
			const cardWidth = availableWidthForCards / cols

			// Only use this column count if cards will be within acceptable range
			if (cardWidth >= finalMinWidth && cardWidth <= finalMaxWidth + 50) {
				optimalColumns = cols
			} else if (cardWidth < finalMinWidth) {
				// If cards would be too narrow, stop here
				break
			}
		}

		// Apply responsive constraints - more conservative approach
		if (containerWidth < 640) {
			optimalColumns = 1
		} else if (containerWidth < 768) {
			optimalColumns = Math.min(optimalColumns, 2)
		} else if (containerWidth < 1024) {
			optimalColumns = Math.min(
				optimalColumns,
				cardType === "horizontal" ? 2 : 3
			)
		} else if (containerWidth < 1280) {
			optimalColumns = Math.min(
				optimalColumns,
				cardType === "horizontal" ? 2 : 4
			)
		} else {
			optimalColumns = Math.min(
				optimalColumns,
				cardType === "horizontal" ? 3 : 5
			)
		}

		return optimalColumns
	}

	return (
		<div
			className={cn("w-full", className)}
			style={{
				display: "grid",
				gap: `${preferredGap}px`,
				gridTemplateColumns: `repeat(var(--grid-columns, 1), minmax(${finalMinWidth}px, 1fr))`,
				justifyItems: "start",
				alignItems: "start",
			}}
			ref={(el) => {
				if (el) {
					const updateColumns = () => {
						const containerWidth = el.offsetWidth
						const columns = calculateColumns(containerWidth)
						el.style.setProperty("--grid-columns", columns.toString())
					}

					// Initial calculation
					updateColumns()

					// Set up resize observer
					const resizeObserver = new ResizeObserver(updateColumns)
					resizeObserver.observe(el)

					// Cleanup function
					return () => resizeObserver.disconnect()
				}
			}}
			{...props}
		>
			{children}
		</div>
	)
}

// Container with built-in padding and max-width
export function ResponsiveContainer({
	children,
	className,
	maxWidth = "7xl",
	padding = "responsive",
	...props
}: {
	children: React.ReactNode
	className?: string
	maxWidth?:
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| "6xl"
		| "7xl"
		| "full"
	padding?: "none" | "sm" | "md" | "lg" | "responsive"
} & React.HTMLAttributes<HTMLDivElement>) {
	const maxWidthClass = maxWidth === "full" ? "max-w-full" : `max-w-${maxWidth}`

	const paddingClass = {
		none: "",
		sm: "px-4",
		md: "px-6",
		lg: "px-8",
		responsive: "px-4 sm:px-6 lg:px-8",
	}[padding]

	return (
		<div
			className={cn("w-full mx-auto", maxWidthClass, paddingClass, className)}
			{...props}
		>
			{children}
		</div>
	)
}
