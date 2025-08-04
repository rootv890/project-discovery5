/**
 * @fileoverview Dashboard Tools Search Parameters - URL State Management
 *
 * This module provides type-safe URL parameter management for dashboard tools
 * filtering, search, and pagination functionality using nuqs.
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server"

// =============================================================================
// URL PARAMETER PARSERS
// =============================================================================

export const dashboardToolsSearchParams = {
	/**
	 * Search Query
	 * Maps to: ?search=figma
	 * Full-text search across tool names, subtitles, and descriptions
	 */
	search: parseAsString.withDefault("").withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Current Page
	 * Maps to: ?page=2
	 * Pagination page number (1-based)
	 */
	page: parseAsInteger.withDefault(1).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Page Size
	 * Maps to: ?pageSize=20
	 * Number of items per page
	 */
	pageSize: parseAsInteger.withDefault(20).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Tool Status Filter
	 * Maps to: ?status=approved
	 * Filter by tool approval status
	 */
	status: parseAsStringEnum([
		"all",
		"draft",
		"pending_review",
		"approved",
		"rejected",
	])
		.withDefault("approved")
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Pricing Filter
	 * Maps to: ?pricing=freemium
	 * Filter by tool pricing model
	 */
	pricing: parseAsStringEnum([
		"all",
		"free",
		"free open source",
		"paid",
		"freemium",
		"subscription",
		"one-time",
	])
		.withDefault("all")
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Categories Filter
	 * Maps to: ?categories=cat1,cat2,cat3
	 * Multi-select category filtering
	 */
	categories: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Platforms Filter
	 * Maps to: ?platforms=web,mobile,desktop
	 * Multi-select platform filtering
	 */
	platforms: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Tags Filter
	 * Maps to: ?tags=ai,productivity,design
	 * Multi-select tag filtering
	 */
	tags: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Sort Field
	 * Maps to: ?sortBy=name
	 * Field to sort tools by
	 */
	sortBy: parseAsStringEnum([
		"name",
		"createdAt",
		"updatedAt",
		"pricing",
		"popularity",
		"rating",
	])
		.withDefault("createdAt")
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Sort Direction
	 * Maps to: ?sortDirection=asc
	 * Ascending or descending sort order
	 */
	sortDirection: parseAsStringEnum(["asc", "desc"])
		.withDefault("desc")
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Featured Only Filter
	 * Maps to: ?featured=true
	 * Show only featured tools
	 */
	featured: parseAsBoolean.withDefault(false).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Has Image Filter
	 * Maps to: ?hasImage=true
	 * Show only tools with images
	 */
	hasImage: parseAsBoolean.withDefault(false).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * View Mode
	 * Maps to: ?view=grid
	 * Grid or list view mode
	 */
	view: parseAsStringEnum(["grid", "list"]).withDefault("grid").withOptions({
		clearOnDefault: true,
	}),
} as const

// =============================================================================
// TYPES
// =============================================================================

export type DashboardToolsSearchParamsType = typeof dashboardToolsSearchParams

// =============================================================================
// SERVER-SIDE CACHE
// =============================================================================

/**
 * Server-side search params cache for dashboard tools
 * Use this in server components and API routes
 */
export const dashboardToolsSearchParamsCache = createSearchParamsCache(
	dashboardToolsSearchParams
)

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Converts dashboard search parameters into a TRPC API input object, applying defaults and omitting filters set to "all" or empty.
 *
 * @param searchParams - Partial set of dashboard search parameters from the URL
 * @returns An object formatted for TRPC API queries, with defaults applied and irrelevant filters omitted
 */
export function searchParamsToTRPCInput(
	searchParams: Partial<Record<keyof DashboardToolsSearchParamsType, any>>
) {
	return {
		page: searchParams.page || 1,
		pageSize: searchParams.pageSize || 20,
		search: searchParams.search || undefined,
		status: searchParams.status || "approved",
		pricing: searchParams.pricing !== "all" ? searchParams.pricing : undefined,
		categories:
			searchParams.categories?.length > 0 ? searchParams.categories : undefined,
		platforms:
			searchParams.platforms?.length > 0 ? searchParams.platforms : undefined,
		tags: searchParams.tags?.length > 0 ? searchParams.tags : undefined,
		sortBy: searchParams.sortBy || "createdAt",
		sortDirection: searchParams.sortDirection || "desc",
		featured: searchParams.featured || undefined,
		hasImage: searchParams.hasImage || undefined,
	}
}

/**
 * Generates a summary of active dashboard tool filters based on the provided search parameters.
 *
 * Constructs an array of human-readable labels for each active filter (such as search query, status, pricing, selected categories, platforms, tags, featured, and image presence) and returns the total count of active filters along with their labels.
 *
 * @param searchParams - Partial set of dashboard tools search parameters to summarize
 * @returns An object containing the count of active filters and an array of descriptive labels
 */
export function buildFilterSummary(
	searchParams: Partial<Record<keyof DashboardToolsSearchParamsType, any>>
) {
	const activeFilters = []

	if (searchParams.search) {
		activeFilters.push(`Search: "${searchParams.search}"`)
	}

	if (searchParams.status !== "approved" && searchParams.status !== "all") {
		activeFilters.push(`Status: ${searchParams.status}`)
	}

	if (searchParams.pricing && searchParams.pricing !== "all") {
		activeFilters.push(`Pricing: ${searchParams.pricing}`)
	}

	if (searchParams.categories?.length > 0) {
		activeFilters.push(`Categories: ${searchParams.categories.length}`)
	}

	if (searchParams.platforms?.length > 0) {
		activeFilters.push(`Platforms: ${searchParams.platforms.length}`)
	}

	if (searchParams.tags?.length > 0) {
		activeFilters.push(`Tags: ${searchParams.tags.length}`)
	}

	if (searchParams.featured) {
		activeFilters.push("Featured only")
	}

	if (searchParams.hasImage) {
		activeFilters.push("With images only")
	}

	return {
		count: activeFilters.length,
		labels: activeFilters,
	}
}
