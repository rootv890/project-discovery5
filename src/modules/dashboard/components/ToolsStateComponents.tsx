/**
 * @fileoverview Dashboard State Components - Error & Empty States
 *
 * User-friendly state components for the dashboard including:
 * - Error states with retry functionality
 * - Empty states for filtered and unfiltered results
 * - Consistent messaging and actions
 * - Accessible design patterns
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Search } from "lucide-react"
import { ToolsEmptyStateProps, ToolsErrorProps } from "../types"

// =============================================================================
// ERROR COMPONENT
/**
 * Displays an error state for failed tool data loading, with an option to retry.
 *
 * Shows an error icon, a descriptive message about possible network or server issues, and a "Try Again" button that triggers the provided retry callback. In development mode, reveals detailed error information for debugging.
 *
 * @param error - The error object containing details about the failure
 * @param onRetry - Callback invoked when the user clicks the retry button
 */

export function ToolsError({ error, onRetry }: ToolsErrorProps) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
				<AlertCircle className="h-12 w-12 text-destructive" />
			</div>
			<h3 className="text-lg font-semibold mb-2">Failed to load tools</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				We encountered an error while fetching the tools. This might be due to a
				network issue or server problem.
			</p>
			<Button
				onClick={onRetry}
				className="gap-2"
			>
				<RefreshCw className="h-4 w-4" />
				Try Again
			</Button>

			{/* Debug information in development */}
			{process.env.NODE_ENV === "development" && (
				<details className="mt-4 text-sm text-muted-foreground">
					<summary className="cursor-pointer hover:text-foreground">
						Debug Information
					</summary>
					<pre className="mt-2 p-2 bg-muted rounded text-xs max-w-md overflow-auto">
						{error.message}
					</pre>
				</details>
			)}
		</div>
	)
}

// =============================================================================
// EMPTY STATE COMPONENT
/**
 * Displays an empty state message when no tools are available or when filters yield no results.
 *
 * Shows a contextual heading and message based on whether filters are applied, and provides a "Clear All Filters" button if applicable.
 *
 * @param hasFilters - Indicates if any filters are currently applied
 * @param onClearFilters - Callback invoked when the user chooses to clear all filters
 */

export function ToolsEmptyState({
	hasFilters,
	onClearFilters,
}: ToolsEmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
				<Search className="h-12 w-12 text-muted-foreground" />
			</div>
			<h3 className="text-lg font-semibold mb-2">
				{hasFilters ? "No tools match your filters" : "No tools available"}
			</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				{hasFilters
					? "Try adjusting your search criteria or clearing some filters to see more results."
					: "There are no tools available at the moment. Check back later!"}
			</p>
			{hasFilters && (
				<Button
					variant="outline"
					onClick={onClearFilters}
					className="gap-2"
				>
					Clear All Filters
				</Button>
			)}
		</div>
	)
}

// =============================================================================
// NETWORK ERROR COMPONENT
/**
 * Displays a network connection error state with a retry option.
 *
 * Renders an alert icon, a message indicating a connection problem, and a "Retry Connection" button that invokes the provided callback.
 */

export function NetworkError({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mb-6">
				<AlertCircle className="h-12 w-12 text-warning" />
			</div>
			<h3 className="text-lg font-semibold mb-2">Connection Problem</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				Unable to connect to the server. Please check your internet connection
				and try again.
			</p>
			<Button
				onClick={onRetry}
				className="gap-2"
			>
				<RefreshCw className="h-4 w-4" />
				Retry Connection
			</Button>
		</div>
	)
}

// =============================================================================
// TIMEOUT ERROR COMPONENT
/**
 * Displays a user-friendly error state for request timeouts with an option to retry the operation.
 *
 * Renders a warning icon, a descriptive message about the timeout, and a "Try Again" button that triggers the provided retry callback.
 */

export function TimeoutError({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mb-6">
				<AlertCircle className="h-12 w-12 text-warning" />
			</div>
			<h3 className="text-lg font-semibold mb-2">Request Timeout</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				The request is taking longer than expected. This might be due to heavy
				server load.
			</p>
			<Button
				onClick={onRetry}
				className="gap-2"
			>
				<RefreshCw className="h-4 w-4" />
				Try Again
			</Button>
		</div>
	)
}
