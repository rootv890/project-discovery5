/**
 * @fileoverview Tools Grid Component
 *
 * Responsive grid component for displaying tools with:
 * - Grid and list view modes
 * - Responsive product cards
 * - Optimized rendering
 * - Consistent spacing and layout
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { HorizontalProductCard } from "@/components/HorizontalProductCard"
import { VerticalProductCard } from "@/components/VerticalProductCard"
import { ProductGrid } from "@/components/ui/responsive-grid"
import { Tool, ViewMode } from "../types"

// =============================================================================
// TYPES
// =============================================================================

interface ToolsGridProps {
	tools: Tool[]
	viewMode: ViewMode
	className?: string
}

interface ToolCardProps {
	tool: Tool
	viewMode: ViewMode
}

// =============================================================================
// TOOLS GRID COMPONENT
// =============================================================================

export function ToolsGrid({ tools, viewMode, className }: ToolsGridProps) {
	if (tools.length === 0) {
		return null
	}

	return (
		<ProductGrid
			cardType={viewMode === "grid" ? "vertical" : "horizontal"}
			preferredGap={viewMode === "grid" ? 16 : 12}
			className={className}
		>
			{tools.map((tool) => (
				<ToolCard
					key={tool.id}
					tool={tool}
					viewMode={viewMode}
				/>
			))}
		</ProductGrid>
	)
}

// =============================================================================
// TOOL CARD COMPONENT
// =============================================================================

function ToolCard({ tool, viewMode }: ToolCardProps) {
	const cardProps = {
		imageSrc: tool.imageUrl || "/images/hero-img.jpg",
		title: tool.name,
		subtitle: tool.subtitle || "",
		description: tool.description || "No description available",
		visitUrl: tool.imageUrl || undefined,
		moreInfoUrl: `/tools/${tool.slug}`,
		variant: "filled" as const,
	}

	return viewMode === "list" ? (
		<HorizontalProductCard {...cardProps} />
	) : (
		<VerticalProductCard {...cardProps} />
	)
}

// =============================================================================
// TOOLS GRID WITH VIRTUAL SCROLLING (Future Enhancement)
// =============================================================================

export function VirtualizedToolsGrid({
	tools,
	viewMode,
	className,
}: ToolsGridProps) {
	// This could be implemented later for performance with large datasets
	// using libraries like react-window or react-virtualized
	return (
		<ToolsGrid
			tools={tools}
			viewMode={viewMode}
			className={className}
		/>
	)
}

// =============================================================================
// TOOLS GRID WITH SELECTION (Future Enhancement)
// =============================================================================

interface SelectableToolsGridProps extends ToolsGridProps {
	selectedTools?: string[]
	onToolSelect?: (toolId: string) => void
	selectionMode?: boolean
}

export function SelectableToolsGrid({
	tools,
	viewMode,
	selectedTools = [],
	onToolSelect,
	selectionMode = false,
	className,
}: SelectableToolsGridProps) {
	// Future enhancement for admin interfaces
	// Would add selection checkboxes to each tool card
	return (
		<ToolsGrid
			tools={tools}
			viewMode={viewMode}
			className={className}
		/>
	)
}
