/**
 * @fileoverview Dashboard Components Index
 *
 * Centralized exports for all dashboard components:
 * - Main dashboard components
 * - Loading states and skeletons
 * - Error and empty state components
 * - Statistics components
 * - Filter and search components
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

// =============================================================================
// MAIN COMPONENTS
// =============================================================================

export { DashboardStats, DashboardStatsWithTrends } from "./DashboardStats"
export {
	SelectableToolsGrid,
	ToolsGrid,
	VirtualizedToolsGrid,
} from "./ToolsGrid"
export { SearchStats, ToolsSearchFilterBar } from "./ToolsSearchFilterBar"

// =============================================================================
// LOADING STATES
// =============================================================================

export { DashboardStatsSkeleton, ToolsGridSkeleton } from "./ToolsLoadingStates"

// =============================================================================
// STATE COMPONENTS
// =============================================================================

export {
	NetworkError,
	TimeoutError,
	ToolsEmptyState,
	ToolsError,
} from "./ToolsStateComponents"

// =============================================================================
// SHARED COMPONENTS (from categories module)
// =============================================================================

// Re-export pagination from categories module
export { Pagination as ToolsPagination } from "../../categories/components/Pagination"
