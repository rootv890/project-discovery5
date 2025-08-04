/**
 * @fileoverview Dashboard View - Main Dashboard Component
 *
 * Main dashboard view component with:
 * - Comprehensive tools display with search and filtering
 * - Real-time statistics and metrics
 * - Responsive design and loading states
 * - URL state synchronization
 * - Error handling and empty states
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer } from "@/components/ui/responsive-grid"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useQueryStates } from "nuqs"
import { useMemo } from "react"
import { Pagination as ToolsPagination } from "../../../categories/components/Pagination"
import { DashboardStats } from "../../components/DashboardStats"
import { QuickFilterBar } from "../../components/QuickFilterBar"
import { ToolsGrid } from "../../components/ToolsGrid"
import { ToolsGridSkeleton } from "../../components/ToolsLoadingStates"
import { ToolsSearchFilterBar } from "../../components/ToolsSearchFilterBar"
import { ToolsSorting } from "../../components/ToolsSorting"
import {
	ToolsEmptyState,
	ToolsError,
} from "../../components/ToolsStateComponents"
import {
	dashboardToolsSearchParams,
	searchParamsToTRPCInput,
} from "../../params"
import { getDefaultParams, hasActiveFilters } from "../../utils"

// =============================================================================
// MAIN DASHBOARD COMPONENT
/**
 * Displays the main dashboard view for browsing, searching, filtering, and sorting a collection of development tools.
 *
 * Synchronizes state with URL parameters, fetches tools data with pagination and metadata, and renders appropriate UI components for loading, error, empty, and populated states. Includes real-time statistics, search and filter bars, sorting controls, and pagination.
 */

export default function DashboardPageView() {
	// URL state management
	const [params, setParams] = useQueryStates(dashboardToolsSearchParams)

	// TRPC client
	const trpc = useTRPC()

	// Convert params to TRPC input
	const trpcInput = useMemo(() => searchParamsToTRPCInput(params), [params])

	// Fetch tools data
	const {
		data: response,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery(trpc.tools.getAllTools.queryOptions(trpcInput))

	// Extract data
	const tools = response?.items || []
	const meta = response?.meta || {
		total: 0,
		totalPages: 0,
		page: 1,
		pageSize: 20,
		hasNextPage: false,
		hasPreviousPage: false,
	}

	// Event handlers
	const handleRetry = () => {
		refetch()
	}

	const handleClearAllFilters = () => {
		setParams(getDefaultParams())
	}

	// Check if filters are active
	const hasFilters = hasActiveFilters(params)

	// ==========================================================================
	// RENDER
	// ==========================================================================

	return (
		<ResponsiveContainer
			maxWidth="7xl"
			className="py-8"
		>
			<div className="space-y-8">
				{/* Header Section */}
				<div className="space-y-4">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold tracking-tight">
								Tools Dashboard
							</h1>
							<p className="text-lg text-muted-foreground max-w-2xl">
								Discover and explore our comprehensive collection of development
								tools, design resources, and productivity applications.
							</p>
						</div>
						<Badge
							variant="secondary"
							className="w-fit"
						>
							{meta.total.toLocaleString()} tools available
						</Badge>
					</div>

					{/* Dashboard Stats */}
					<DashboardStats />
				</div>

				{/* Search & Filter Bar */}
				<ToolsSearchFilterBar />

				{/* Quick Filter Bar */}
				<QuickFilterBar />

				{/* Sorting and Results Info */}
				{!isLoading && !isError && <ToolsSorting total={meta.total} />}

				{/* Tools Grid/List */}
				<div className="space-y-6">
					{/* Loading State */}
					{isLoading && <ToolsGridSkeleton view={params.view} />}

					{/* Error State */}
					{isError && (
						<ToolsError
							error={error as unknown as Error}
							onRetry={handleRetry}
						/>
					)}

					{/* Empty State */}
					{!isLoading && !isError && tools.length === 0 && (
						<ToolsEmptyState
							hasFilters={hasFilters}
							onClearFilters={handleClearAllFilters}
						/>
					)}

					{/* Tools Grid */}
					{!isLoading && !isError && tools.length > 0 && (
						<>
							<ToolsGrid
								tools={tools}
								viewMode={params.view}
							/>

							{/* Pagination */}
							<ToolsPagination
								total={meta.total}
								totalPages={meta.totalPages}
							/>
						</>
					)}
				</div>
			</div>
		</ResponsiveContainer>
	)
}
