/**
 * @fileoverview Dashboard Statistics Component
 *
 * Statistics cards showing tool counts and metrics with:
 * - Real-time data fetching
 * - Loading states
 * - Responsive grid layout
 * - Color-coded metrics
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { TrendingUp } from "lucide-react"
import { DashboardStatsProps } from "../types"
import { DashboardStatsSkeleton } from "./ToolsLoadingStates"

// =============================================================================
// DASHBOARD STATS COMPONENT
/**
 * Displays a grid of dashboard statistic cards for tools, including total, approved, free, and freemium counts.
 *
 * Shows a loading skeleton while fetching data and returns nothing if no statistics are available.
 *
 * @param className - Optional additional CSS class names for the grid container
 */

export function DashboardStats({ className }: DashboardStatsProps) {
	const trpc = useTRPC()
	const { data: stats, isLoading } = useQuery(
		trpc.tools.getToolsStats.queryOptions()
	)

	if (isLoading) {
		return <DashboardStatsSkeleton />
	}

	if (!stats) return null

	const statItems = [
		{
			label: "Total Tools",
			value: stats.total,
			icon: TrendingUp,
			color: "text-blue-600",
			bgColor: "bg-blue-50 dark:bg-blue-950/20",
		},
		{
			label: "Approved",
			value: stats.approved,
			icon: TrendingUp,
			color: "text-green-600",
			bgColor: "bg-green-50 dark:bg-green-950/20",
		},
		{
			label: "Free Tools",
			value: stats.free,
			icon: TrendingUp,
			color: "text-purple-600",
			bgColor: "bg-purple-50 dark:bg-purple-950/20",
		},
		{
			label: "Freemium",
			value: stats.freemium,
			icon: TrendingUp,
			color: "text-orange-600",
			bgColor: "bg-orange-50 dark:bg-orange-950/20",
		},
	]

	return (
		<div
			className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", className)}
		>
			{statItems.map((stat, index) => (
				<StatCard
					key={index}
					{...stat}
				/>
			))}
		</div>
	)
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
	label: string
	value: number
	icon: React.ComponentType<{ className?: string }>
	color: string
	bgColor: string
}

/**
 * Displays a statistic card with a label, formatted value, and a color-coded icon.
 *
 * Used for presenting individual dashboard metrics in a visually distinct card layout.
 *
 * @param label - The label describing the statistic
 * @param value - The numeric value to display
 * @param icon - The icon component representing the statistic
 * @param color - The icon color class
 * @param bgColor - The background color class for the icon container
 */
function StatCard({ label, value, icon: Icon, color, bgColor }: StatCardProps) {
	return (
		<div className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold">{value.toLocaleString()}</p>
				</div>
				<div className={cn("p-2 rounded-lg", bgColor)}>
					<Icon className={cn("h-5 w-5", color)} />
				</div>
			</div>
		</div>
	)
}

// =============================================================================
// ENHANCED STATS WITH TRENDS
/**
 * Displays dashboard statistics with additional trend metrics for tools.
 *
 * Fetches and presents main tool statistics along with approval rate and free tools percentage, including visual badges indicating metric status. Shows loading skeleton while data is loading and returns nothing if no data is available.
 *
 * @param className - Optional CSS class for custom styling
 */

export function DashboardStatsWithTrends({ className }: DashboardStatsProps) {
	const trpc = useTRPC()
	const { data: stats, isLoading } = useQuery(
		trpc.tools.getToolsStats.queryOptions()
	)

	if (isLoading) {
		return <DashboardStatsSkeleton />
	}

	if (!stats) return null

	const approvalRate =
		stats.total > 0 ? (stats.approved / stats.total) * 100 : 0
	const freeToolsPercentage =
		stats.total > 0 ? (stats.free / stats.total) * 100 : 0

	return (
		<div className={cn("space-y-6", className)}>
			{/* Main Stats */}
			<DashboardStats />

			{/* Additional Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-card rounded-lg p-4 border">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-muted-foreground">
							Approval Rate
						</h4>
						<Badge
							variant={approvalRate >= 80 ? "default" : "secondary"}
							className="text-xs"
						>
							{approvalRate >= 80 ? "Good" : "Needs Attention"}
						</Badge>
					</div>
					<p className="text-xl font-bold">{approvalRate.toFixed(1)}%</p>
					<p className="text-xs text-muted-foreground">
						{stats.approved} of {stats.total} tools approved
					</p>
				</div>

				<div className="bg-card rounded-lg p-4 border">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-muted-foreground">
							Free Tools
						</h4>
						<Badge
							variant="outline"
							className="text-xs"
						>
							{freeToolsPercentage.toFixed(1)}%
						</Badge>
					</div>
					<p className="text-xl font-bold">{stats.free.toLocaleString()}</p>
					<p className="text-xs text-muted-foreground">
						Including {stats.freemium} freemium tools
					</p>
				</div>
			</div>
		</div>
	)
}
