/**
 * @fileoverview View Mode Toggle Component - URL-Synchronized View Control
 *
 * This component demonstrates URL state management for view mode switching:
 * - Instant URL updates when view mode changes
 * - Visual feedback for current view mode
 * - Accessible button group design
 * - Responsive behavior on mobile devices
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
	categorySearchParams,
	VIEW_MODES,
	type ViewMode,
} from "@/modules/categories/params"
import { Grid3X3, LayoutGrid, List } from "lucide-react"
import { useQueryStates } from "nuqs"

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * ViewModeToggle - URL-Synchronized View Mode Control
 *
 * This component allows users to switch between different view modes
 * (grid, list, compact) while maintaining URL synchronization.
 *
 * Features:
 * - Immediate URL updates when view mode changes
 * - Visual indicators for active view mode
 * - Keyboard navigation support
 * - Mobile-responsive design
 */
export function ViewModeToggle() {
	const [{ viewMode }, setParams] = useQueryStates(categorySearchParams)

	/**
	 * Handle view mode changes with URL synchronization
	 * Maintains current page when switching views
	 */
	const handleViewModeChange = (newViewMode: ViewMode) => {
		setParams({ viewMode: newViewMode })
	}

	/**
	 * View mode configuration with icons and labels
	 */
	const viewModeConfig = [
		{
			mode: "grid" as ViewMode,
			icon: Grid3X3,
			label: "Grid View",
			tooltip: "Show categories in a grid layout",
		},
		{
			mode: "list" as ViewMode,
			icon: List,
			label: "List View",
			tooltip: "Show categories in a detailed list",
		},
		{
			mode: "compact" as ViewMode,
			icon: LayoutGrid,
			label: "Compact View",
			tooltip: "Show categories in a compact grid",
		},
	]

	return (
		<div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
			{viewModeConfig.map(({ mode, icon: Icon, label, tooltip }) => (
				<Button
					key={mode}
					variant="ghost"
					size="sm"
					onClick={() => handleViewModeChange(mode)}
					className={cn(
						"relative px-3 py-2 rounded-md transition-all duration-200",
						viewMode === mode
							? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
							: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					)}
					title={tooltip}
				>
					<Icon className="h-4 w-4" />
					<span className="sr-only">{label}</span>

					{/* Active indicator */}
					{viewMode === mode && (
						<div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
					)}
				</Button>
			))}
		</div>
	)
}
