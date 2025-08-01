"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UseResponsiveGridOptions {
	cardType: "horizontal" | "vertical" | "mixed"
	minCardWidth: number
	maxCardWidth?: number
	preferredGap?: number
	maxGap?: number
}

interface ResponsiveGridResult {
	columns: number
	gap: number
	cardWidth: number
	containerRef: React.RefObject<HTMLDivElement>
}

export function useResponsiveGrid({
	cardType,
	minCardWidth,
	maxCardWidth,
	preferredGap = 16,
	maxGap = 24,
}: UseResponsiveGridOptions): ResponsiveGridResult {
	const containerRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState({
		columns: 1,
		gap: preferredGap,
		cardWidth: minCardWidth,
	})

	const calculateOptimalLayout = useCallback(
		(containerWidth: number) => {
			if (containerWidth <= 0) return dimensions

			// Define card type constraints
			const cardConstraints = {
				horizontal: {
					minWidth: Math.max(minCardWidth, 300),
					maxWidth: maxCardWidth || 500,
					preferredCols: { sm: 1, md: 1, lg: 2, xl: 2 },
				},
				vertical: {
					minWidth: Math.max(minCardWidth, 250),
					maxWidth: maxCardWidth || 400,
					preferredCols: { sm: 1, md: 2, lg: 3, xl: 4 },
				},
				mixed: {
					minWidth: Math.max(minCardWidth, 280),
					maxWidth: maxCardWidth || 420,
					preferredCols: { sm: 1, md: 2, lg: 3, xl: 3 },
				},
			}

			const constraints = cardConstraints[cardType]
			let optimalColumns = 1
			let optimalGap = preferredGap
			let calculatedCardWidth = constraints.minWidth

			// Try different column counts to find the best fit
			for (let cols = 1; cols <= 6; cols++) {
				const totalGapWidth = (cols - 1) * preferredGap
				const availableWidthForCards = containerWidth - totalGapWidth
				const potentialCardWidth = availableWidthForCards / cols

				// Check if this configuration works
				if (
					potentialCardWidth >= constraints.minWidth &&
					(!constraints.maxWidth || potentialCardWidth <= constraints.maxWidth)
				) {
					optimalColumns = cols
					calculatedCardWidth = Math.min(
						potentialCardWidth,
						constraints.maxWidth || potentialCardWidth
					)

					// Adjust gap if we have extra space
					const usedWidth = calculatedCardWidth * cols
					const extraSpace = containerWidth - usedWidth
					const maxPossibleGap = Math.min(extraSpace / (cols - 1 || 1), maxGap)
					optimalGap = Math.max(preferredGap, Math.min(maxPossibleGap, maxGap))
				}
			}

			// Responsive breakpoint adjustments
			const breakpoints = {
				sm: 640,
				md: 768,
				lg: 1024,
				xl: 1280,
			}

			if (containerWidth < breakpoints.sm) {
				optimalColumns = 1
				optimalGap = Math.min(optimalGap, 12)
			} else if (containerWidth < breakpoints.md) {
				optimalColumns = Math.min(
					optimalColumns,
					cardType === "horizontal" ? 1 : 2
				)
				optimalGap = Math.min(optimalGap, 16)
			} else if (containerWidth < breakpoints.lg) {
				optimalColumns = Math.min(
					optimalColumns,
					cardType === "horizontal" ? 1 : cardType === "vertical" ? 2 : 2
				)
				optimalGap = Math.min(optimalGap, 20)
			}

			return {
				columns: optimalColumns,
				gap: Math.round(optimalGap),
				cardWidth: Math.round(calculatedCardWidth),
			}
		},
		[cardType, minCardWidth, maxCardWidth, preferredGap, maxGap, dimensions]
	)

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const newDimensions = calculateOptimalLayout(containerWidth)
				setDimensions(newDimensions)
			}
		}

		// Initial calculation
		handleResize()

		// Set up resize observer
		const resizeObserver = new ResizeObserver(handleResize)
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}

		// Fallback for window resize
		window.addEventListener("resize", handleResize)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener("resize", handleResize)
		}
	}, [calculateOptimalLayout])

	return {
		columns: dimensions.columns,
		gap: dimensions.gap,
		cardWidth: dimensions.cardWidth,
		containerRef,
	}
}
