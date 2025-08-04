/**
 * @fileoverview Dashboard Utilities - Helper Functions
 *
 * Utility functions for the dashboard module including:
 * - Filter helper functions
 * - Data transformation utilities
 * - URL state management helpers
 * - Validation utilities
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { type DashboardToolsSearchParamsType } from "./params"
import { FilterSummary, Tool, ToolsResponse } from "./types"

// =============================================================================
// FILTER HELPERS
// =============================================================================

/**
 * Determines whether any filter parameters are active.
 *
 * Returns `true` if at least one filter (search term, status, pricing, categories, platforms, tags, featured, or image presence) is set to a non-default value; otherwise, returns `false`.
 */
export function hasActiveFilters(params: any): boolean {
	return Boolean(
		params.search ||
			params.status !== "approved" ||
			params.pricing !== "all" ||
			params.categories.length > 0 ||
			params.platforms.length > 0 ||
			params.tags.length > 0 ||
			params.featured ||
			params.hasImage
	)
}

/**
 * Generates a summary of active filters, including descriptive labels and a count of all active filters.
 *
 * @param params - The filter parameters to summarize
 * @returns An object containing the total count of active filters and an array of descriptive labels
 */
export function getFilterSummary(params: any): FilterSummary {
	const labels: string[] = []
	let count = 0

	if (params.search) {
		labels.push(`Search: "${params.search}"`)
		count++
	}

	if (params.status !== "approved") {
		labels.push(`Status: ${params.status}`)
		count++
	}

	if (params.pricing !== "all") {
		labels.push(`Pricing: ${params.pricing}`)
		count++
	}

	if (params.categories.length > 0) {
		labels.push(`Categories: ${params.categories.length}`)
		count += params.categories.length
	}

	if (params.platforms.length > 0) {
		labels.push(`Platforms: ${params.platforms.length}`)
		count += params.platforms.length
	}

	if (params.tags.length > 0) {
		labels.push(`Tags: ${params.tags.length}`)
		count += params.tags.length
	}

	if (params.featured) {
		labels.push("Featured only")
		count++
	}

	if (params.hasImage) {
		labels.push("With images")
		count++
	}

	return { count, labels }
}

/**
 * Returns an object containing the default filter parameters for the dashboard.
 *
 * The returned object includes default values for search, status, pricing, categories, platforms, tags, sorting, featured flag, image presence, and page number.
 */
export function getDefaultParams(): any {
	return {
		search: "",
		status: "approved",
		pricing: "all",
		categories: [],
		platforms: [],
		tags: [],
		sortBy: "createdAt",
		sortDirection: "desc",
		featured: false,
		hasImage: false,
		page: 1,
	}
}

// =============================================================================
// DATA TRANSFORMATION HELPERS
// =============================================================================

/**
 * Maps an array of tools to include formatted display strings for pricing and status.
 *
 * @returns An array of tools, each extended with `displayPrice` and `displayStatus` properties for UI display.
 */
export function transformToolsForDisplay(tools: Tool[]) {
	return tools.map((tool) => ({
		...tool,
		displayPrice: formatPricing(tool.pricing),
		displayStatus: formatStatus(tool.status),
	}))
}

/**
 * Converts a tool's pricing value into a human-readable string for display.
 *
 * @param pricing - The pricing category of the tool
 * @returns The formatted pricing label, or "Unknown" if the value is unrecognized
 */
export function formatPricing(pricing: Tool["pricing"]): string {
	switch (pricing) {
		case "free":
			return "Free"
		case "free open source":
			return "Free & Open Source"
		case "paid":
			return "Paid"
		case "freemium":
			return "Freemium"
		case "subscription":
			return "Subscription"
		case "one-time":
			return "One-time Purchase"
		default:
			return "Unknown"
	}
}

/**
 * Converts a tool's status value into a human-readable string for display.
 *
 * @param status - The status value to format
 * @returns The formatted status string, or "Unknown" if the status is unrecognized
 */
export function formatStatus(status: Tool["status"]): string {
	switch (status) {
		case "draft":
			return "Draft"
		case "pending_review":
			return "Pending Review"
		case "approved":
			return "Approved"
		case "rejected":
			return "Rejected"
		default:
			return "Unknown"
	}
}

/**
 * Returns the CSS class string representing the background and text color for a tool's status badge.
 *
 * @param status - The status value of the tool
 * @returns A string of CSS classes for the corresponding status badge color
 */
export function getStatusColor(status: Tool["status"]): string {
	switch (status) {
		case "draft":
			return "bg-gray-100 text-gray-800"
		case "pending_review":
			return "bg-yellow-100 text-yellow-800"
		case "approved":
			return "bg-green-100 text-green-800"
		case "rejected":
			return "bg-red-100 text-red-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

/**
 * Returns CSS class strings for badge colors based on the tool's pricing category.
 *
 * @param pricing - The pricing type of the tool
 * @returns A string of CSS classes representing background and text colors for the given pricing
 */
export function getPricingColor(pricing: Tool["pricing"]): string {
	switch (pricing) {
		case "free":
		case "free open source":
			return "bg-green-100 text-green-800"
		case "freemium":
			return "bg-blue-100 text-blue-800"
		case "paid":
		case "subscription":
		case "one-time":
			return "bg-purple-100 text-purple-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

// =============================================================================
// PAGINATION HELPERS
// =============================================================================

/**
 * Calculates pagination metadata for a dataset.
 *
 * @param total - The total number of items in the dataset
 * @param page - The current page number (1-based)
 * @param pageSize - The number of items per page
 * @returns An object containing total pages, start and end item indices for the current page, and booleans indicating the presence of next and previous pages
 */
export function calculatePaginationInfo(
	total: number,
	page: number,
	pageSize: number
) {
	const totalPages = Math.ceil(total / pageSize)
	const startItem = (page - 1) * pageSize + 1
	const endItem = Math.min(page * pageSize, total)
	const hasNextPage = page < totalPages
	const hasPreviousPage = page > 1

	return {
		totalPages,
		startItem,
		endItem,
		hasNextPage,
		hasPreviousPage,
	}
}

/**
 * Generates an array of page numbers and ellipses for pagination controls.
 *
 * The returned array includes the first and last page, a range of pages around the current page, and ellipses ("...") to indicate skipped ranges when appropriate.
 *
 * @param currentPage - The currently active page number
 * @param totalPages - The total number of pages available
 * @param delta - The number of pages to show on each side of the current page (default is 2)
 * @returns An array containing page numbers and ellipses for pagination display
 */
export function generatePageNumbers(
	currentPage: number,
	totalPages: number,
	delta: number = 2
) {
	const range = []
	const rangeWithDots = []

	for (
		let i = Math.max(2, currentPage - delta);
		i <= Math.min(totalPages - 1, currentPage + delta);
		i++
	) {
		range.push(i)
	}

	if (currentPage - delta > 2) {
		rangeWithDots.push(1, "...")
	} else {
		rangeWithDots.push(1)
	}

	rangeWithDots.push(...range)

	if (currentPage + delta < totalPages - 1) {
		rangeWithDots.push("...", totalPages)
	} else if (totalPages > 1) {
		rangeWithDots.push(totalPages)
	}

	return rangeWithDots
}

// =============================================================================
// SEARCH HELPERS
// =============================================================================

/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay has elapsed since the last call.
 *
 * @param delay - The debounce delay in milliseconds
 * @returns A debounced function that wraps the provided callback
 */
export function createSearchDebouncer(delay: number = 300) {
	let timeoutId: NodeJS.Timeout

	return function debounce<T extends (...args: any[]) => any>(
		func: T,
		...args: Parameters<T>
	) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

/**
 * Returns the input text with all occurrences of the search term wrapped in `<mark>` tags for highlighting.
 *
 * If the search term is empty or whitespace, the original text is returned unchanged.
 *
 * @param text - The text in which to highlight search terms
 * @param searchTerm - The term to highlight within the text
 * @returns The text with highlighted search term matches
 */
export function highlightSearchTerms(text: string, searchTerm: string): string {
	if (!searchTerm.trim()) return text

	const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi")
	return text.replace(regex, "<mark>$1</mark>")
}

/**
 * Escapes special characters in a string so it can be safely used in a regular expression.
 *
 * @param string - The input string to escape
 * @returns The escaped string with regex metacharacters prefixed by a backslash
 */
function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Ensures the page number is within the valid range from 1 to totalPages.
 *
 * @param page - The page number to validate
 * @param totalPages - The maximum number of pages allowed
 * @returns The adjusted page number, clamped between 1 and totalPages
 */
export function validatePageNumber(page: number, totalPages: number): number {
	if (page < 1) return 1
	if (page > totalPages) return totalPages
	return page
}

/**
 * Ensures the page size is one of the allowed values (10, 20, 50, 100).
 *
 * Returns the input if valid; otherwise, defaults to 20.
 *
 * @param pageSize - The requested number of items per page
 * @returns The validated page size
 */
export function validatePageSize(pageSize: number): number {
	const validSizes = [10, 20, 50, 100]
	return validSizes.includes(pageSize) ? pageSize : 20
}

// =============================================================================
// ERROR HELPERS
// =============================================================================

/**
 * Determines whether the provided error is related to network issues.
 *
 * Returns `true` if the error message contains keywords indicating a network error; otherwise, returns `false`.
 */
export function isNetworkError(error: unknown): boolean {
	return (
		error instanceof Error &&
		(error.message.includes("fetch") ||
			error.message.includes("network") ||
			error.message.includes("Failed to fetch"))
	)
}

/**
 * Determines whether the provided error is a timeout or abort error.
 *
 * Returns `true` if the error message contains "timeout" or "abort"; otherwise, returns `false`.
 *
 * @returns Whether the error is related to a timeout or abort condition
 */
export function isTimeoutError(error: unknown): boolean {
	return (
		error instanceof Error &&
		(error.message.includes("timeout") || error.message.includes("abort"))
	)
}

/**
 * Returns a user-friendly error message based on the type of error provided.
 *
 * If the error is network-related or a timeout, a descriptive message is returned; otherwise, the error's message or a generic fallback is used.
 *
 * @returns A string containing a user-friendly error message.
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
	if (isNetworkError(error)) {
		return "Unable to connect to the server. Please check your internet connection."
	}

	if (isTimeoutError(error)) {
		return "The request is taking longer than expected. Please try again."
	}

	if (error instanceof Error) {
		return error.message
	}

	return "An unexpected error occurred. Please try again."
}
