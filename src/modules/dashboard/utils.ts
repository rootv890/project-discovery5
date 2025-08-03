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
 * Check if any filters are currently active
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
 * Get filter summary for display
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
 * Clear all filters and return default params
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
 * Transform tools data for display
 */
export function transformToolsForDisplay(tools: Tool[]) {
	return tools.map((tool) => ({
		...tool,
		displayPrice: formatPricing(tool.pricing),
		displayStatus: formatStatus(tool.status),
	}))
}

/**
 * Format pricing for display
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
 * Format status for display
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
 * Get status color for badges
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
 * Get pricing color for badges
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
 * Calculate pagination info
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
 * Generate page numbers for pagination
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
 * Debounce search input
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
 * Highlight search terms in text
 */
export function highlightSearchTerms(text: string, searchTerm: string): string {
	if (!searchTerm.trim()) return text

	const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi")
	return text.replace(regex, "<mark>$1</mark>")
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate page number
 */
export function validatePageNumber(page: number, totalPages: number): number {
	if (page < 1) return 1
	if (page > totalPages) return totalPages
	return page
}

/**
 * Validate page size
 */
export function validatePageSize(pageSize: number): number {
	const validSizes = [10, 20, 50, 100]
	return validSizes.includes(pageSize) ? pageSize : 20
}

// =============================================================================
// ERROR HELPERS
// =============================================================================

/**
 * Check if error is a network error
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
 * Check if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
	return (
		error instanceof Error &&
		(error.message.includes("timeout") || error.message.includes("abort"))
	)
}

/**
 * Get user-friendly error message
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
