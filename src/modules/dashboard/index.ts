/**
 * @fileoverview Dashboard Module Index
 *
 * Main export file for the dashboard module providing:
 * - Main dashboard view component
 * - All dashboard-related types
 * - Dashboard utilities and helpers
 * - Component exports
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

// =============================================================================
// MAIN VIEW COMPONENT
// =============================================================================

export { default as DashboardPageView } from "./ui/views/dashboard-view"

// =============================================================================
// TYPES
// =============================================================================

export type {
	DashboardStatsProps,
	FilterCategory,
	FilterOptions,
	FilterPlatform,
	FilterSummary,
	FilterTag,
	SortDirection,
	SortField,
	Tool,
	ToolPricing,
	ToolsEmptyStateProps,
	ToolsErrorProps,
	ToolsGridSkeletonProps,
	ToolsResponse,
	ToolsStats,
	ToolStatus,
	ViewMode,
} from "./types"

// =============================================================================
// SEARCH PARAMS
// =============================================================================

export {
	buildFilterSummary,
	dashboardToolsSearchParams,
	searchParamsToTRPCInput,
	type DashboardToolsSearchParamsType,
} from "./params"

// =============================================================================
// UTILITIES
// =============================================================================

export {
	calculatePaginationInfo,
	createSearchDebouncer,
	formatPricing,
	formatStatus,
	generatePageNumbers,
	getDefaultParams,
	getFilterSummary,
	getPricingColor,
	getStatusColor,
	getUserFriendlyErrorMessage,
	hasActiveFilters,
	highlightSearchTerms,
	isNetworkError,
	isTimeoutError,
	transformToolsForDisplay,
	validatePageNumber,
	validatePageSize,
} from "./utils"

// =============================================================================
// COMPONENTS
// =============================================================================

export {
	DashboardStats,
	DashboardStatsSkeleton,
	DashboardStatsWithTrends,
	NetworkError,
	SearchStats,
	SelectableToolsGrid,
	TimeoutError,
	ToolsEmptyState,
	ToolsError,
	ToolsGrid,
	ToolsGridSkeleton,
	ToolsPagination,
	ToolsSearchFilterBar,
	VirtualizedToolsGrid,
} from "./components"
