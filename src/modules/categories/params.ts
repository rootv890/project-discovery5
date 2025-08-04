import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	DEFAULT_SORT,
	DEFAULT_SORT_DIRECTION,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/defaults"
import {
	createLoader,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server"
import { z } from "zod"

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

/**
 * Available sort fields for category listings
 * These correspond to database columns and computed fields
 */
export const CATEGORY_SORT_FIELDS = [
	"name", // Alphabetical by category name
	"createdAt", // Creation date (newest/oldest first)
	"updatedAt", // Last modification date
	"toolCount", // Number of tools in category
	"popularity", // Based on tool usage/views
	"slug", // URL-friendly identifier
] as const

/**
 * Sort direction options
 */
export const SORT_DIRECTIONS = ["asc", "desc"] as const

/**
 * View modes for category display
 */
export const VIEW_MODES = ["grid", "list", "compact"] as const

/**
 * Filter options for category status
 */
export const CATEGORY_STATUS_FILTERS = [
	"all",
	"active",
	"draft",
	"archived",
] as const

/**
 * Time-based filter presets
 */
export const TIME_FILTERS = [
	"all", // No time restriction
	"today", // Created today
	"week", // Created this week
	"month", // Created this month
	"year", // Created this year
	"custom", // Custom date range
] as const

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Type-safe sort field union type
 */
export type CategorySortField = (typeof CATEGORY_SORT_FIELDS)[number]

/**
 * Type-safe sort direction union type
 */
export type SortDirection = (typeof SORT_DIRECTIONS)[number]

/**
 * Type-safe view mode union type
 */
export type ViewMode = (typeof VIEW_MODES)[number]

/**
 * Type-safe category status filter union type
 */
export type CategoryStatusFilter = (typeof CATEGORY_STATUS_FILTERS)[number]

/**
 * Type-safe time filter union type
 */
export type TimeFilter = (typeof TIME_FILTERS)[number]

/**
 * Comprehensive category search parameters interface
 * This interface defines all possible URL parameters for category browsing
 */
export interface CategorySearchParams {
	/** Search query string for filtering categories by name/description */
	search: string

	/** Current page number (1-indexed) */
	page: number

	/** Number of items per page */
	pageSize: number

	/** Field to sort by */
	sortBy: CategorySortField

	/** Sort direction (ascending/descending) */
	sortDirection: SortDirection

	/** View mode for displaying categories */
	viewMode: ViewMode

	/** Filter by category status */
	status: CategoryStatusFilter

	/** Time-based filter */
	timeFilter: TimeFilter

	/** Custom date range start (ISO 8601 format) */
	dateFrom: string

	/** Custom date range end (ISO 8601 format) */
	dateTo: string

	/** Selected category IDs for multi-select operations */
	selectedCategories: string[]

	/** Filter by minimum tool count */
	minToolCount: number

	/** Filter by maximum tool count */
	maxToolCount: number

	/** Show only featured categories */
	featuredOnly: boolean

	/** Show only categories with tools */
	hasToolsOnly: boolean

	/** Filter by category tags */
	tags: string[]
}

// =============================================================================
// URL PARAMETER PARSERS
// =============================================================================

/**
 * Comprehensive URL parameter configuration for category search
 * Each parameter includes validation, defaults, and URL cleanup options
 */
export const categorySearchParams = {
	/**
	 * Search Query Parameter
	 * Maps to: ?search=ai+tools
	 * Enables full-text search across category names and descriptions
	 */
	search: parseAsString.withDefault("").withOptions({
		clearOnDefault: true,
		// URL encoding handled automatically
		// Debounced in client components to prevent excessive requests
	}),

	/**
	 * Pagination Parameter
	 * Maps to: ?page=2
	 * 1-indexed page number with bounds checking
	 */
	page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
		clearOnDefault: true,
		// Automatically resets to 1 when filters change
	}),

	/**
	 * Page Size Parameter
	 * Maps to: ?pageSize=25
	 * Controls number of items displayed per page
	 */
	pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Sort Field Parameter
	 * Maps to: ?sortBy=name
	 * Determines primary sort criteria
	 */
	sortBy: parseAsStringEnum(CATEGORY_SORT_FIELDS)
		.withDefault(DEFAULT_SORT as CategorySortField)
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Sort Direction Parameter
	 * Maps to: ?sortDirection=asc
	 * Controls ascending/descending sort order
	 */
	sortDirection: parseAsStringEnum(SORT_DIRECTIONS)
		.withDefault(DEFAULT_SORT_DIRECTION as SortDirection)
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * View Mode Parameter
	 * Maps to: ?viewMode=grid
	 * Controls visual layout of category listings
	 */
	viewMode: parseAsStringEnum(VIEW_MODES)
		.withDefault("grid" as ViewMode)
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Status Filter Parameter
	 * Maps to: ?status=active
	 * Filters categories by their current status
	 */
	status: parseAsStringEnum(CATEGORY_STATUS_FILTERS)
		.withDefault("all" as CategoryStatusFilter)
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Time Filter Parameter
	 * Maps to: ?timeFilter=month
	 * Provides preset time-based filtering
	 */
	timeFilter: parseAsStringEnum(TIME_FILTERS)
		.withDefault("all" as TimeFilter)
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Custom Date Range Start
	 * Maps to: ?dateFrom=2024-01-01
	 * ISO 8601 date string for custom range filtering
	 */
	dateFrom: parseAsString.withDefault("").withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Custom Date Range End
	 * Maps to: ?dateTo=2024-12-31
	 * ISO 8601 date string for custom range filtering
	 */
	dateTo: parseAsString.withDefault("").withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Multi-Select Categories
	 * Maps to: ?selectedCategories=cat1,cat2,cat3
	 * Comma-separated list for bulk operations
	 */
	selectedCategories: parseAsArrayOf(parseAsString)
		.withDefault([])
		.withOptions({
			clearOnDefault: true,
		}),

	/**
	 * Minimum Tool Count Filter
	 * Maps to: ?minToolCount=5
	 * Shows only categories with at least N tools
	 */
	minToolCount: parseAsInteger.withDefault(0).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Maximum Tool Count Filter
	 * Maps to: ?maxToolCount=100
	 * Shows only categories with at most N tools
	 */
	maxToolCount: parseAsInteger.withDefault(1000).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Featured Only Filter
	 * Maps to: ?featuredOnly=true
	 * Shows only promoted/featured categories
	 */
	featuredOnly: parseAsBoolean.withDefault(false).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Has Tools Only Filter
	 * Maps to: ?hasToolsOnly=true
	 * Excludes empty categories from results
	 */
	hasToolsOnly: parseAsBoolean.withDefault(false).withOptions({
		clearOnDefault: true,
	}),

	/**
	 * Category Tags Filter
	 * Maps to: ?tags=productivity,ai,design
	 * Multi-select tag-based filtering
	 */
	tags: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
		clearOnDefault: true,
	}),
} as const

// =============================================================================
// SERVER-SIDE LOADER
// =============================================================================

/**
 * Server-side parameter loader for Next.js App Router
 *
 * This function safely parses and validates URL parameters on the server,
 * providing type-safe access to search parameters in server components.
 *
 * @example
 * ```typescript
 * // In a server component
 * export default async function CategoriesPage({
 *   searchParams
 * }: {
 *   searchParams: Promise<Record<string, string | string[] | undefined>>
 * }) {
 *   const params = await loadCategoryParams(searchParams)
 *
 *   // params is now fully typed and validated
 *   const categories = await fetchCategories(params)
 *
 *   return <CategoryList categories={categories} />
 * }
 * ```
 */
export const loadCategoryParams = createLoader(categorySearchParams)

// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================

/**
 * Zod schema for complete parameter validation
 * Provides runtime type checking and validation beyond URL parsing
 */
export const categoryParamsSchema = z
	.object({
		search: z.string().max(100, "Search query too long"),
		page: z.number().int().min(1, "Page must be positive"),
		pageSize: z.number().int().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE),
		sortBy: z.enum(CATEGORY_SORT_FIELDS),
		sortDirection: z.enum(SORT_DIRECTIONS),
		viewMode: z.enum(VIEW_MODES),
		status: z.enum(CATEGORY_STATUS_FILTERS),
		timeFilter: z.enum(TIME_FILTERS),
		dateFrom: z.string().optional(),
		dateTo: z.string().optional(),
		selectedCategories: z
			.array(z.string())
			.max(50, "Too many selected categories"),
		minToolCount: z.number().int().min(0),
		maxToolCount: z.number().int().min(0),
		featuredOnly: z.boolean(),
		hasToolsOnly: z.boolean(),
		tags: z.array(z.string()).max(20, "Too many tags selected"),
	})
	.refine(
		(data) => {
			// Custom validation: ensure date range is valid
			if (data.dateFrom && data.dateTo) {
				const from = new Date(data.dateFrom)
				const to = new Date(data.dateTo)
				return from <= to
			}
			return true
		},
		{
			message: "Date range invalid: 'from' date must be before 'to' date",
			path: ["dateFrom"],
		}
	)
	.refine(
		(data) => {
			// Custom validation: ensure tool count range is valid
			return data.minToolCount <= data.maxToolCount
		},
		{
			message: "Tool count range invalid: minimum must be less than maximum",
			path: ["minToolCount"],
		}
	)

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Constructs a clean, SEO-friendly URL from parameters
 * Removes default values and formats arrays properly
 */
export function buildCategoryUrl(
	params: Partial<CategorySearchParams>
): string {
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) return

		// Handle arrays (tags, selectedCategories)
		if (Array.isArray(value)) {
			if (value.length > 0) {
				searchParams.set(key, value.join(","))
			}
			return
		}

		// Handle primitives
		const stringValue = String(value)
		if (stringValue !== "" && stringValue !== "0" && stringValue !== "false") {
			searchParams.set(key, stringValue)
		}
	})

	const queryString = searchParams.toString()
	return queryString ? `?${queryString}` : ""
}

/**
 * Validates and sanitizes parameters before sending to API
 */
export function sanitizeCategoryParams(
	params: Partial<CategorySearchParams>
): CategorySearchParams {
	try {
		return categoryParamsSchema.parse({
			search: "",
			page: DEFAULT_PAGE,
			pageSize: DEFAULT_PAGE_SIZE,
			sortBy: DEFAULT_SORT,
			sortDirection: DEFAULT_SORT_DIRECTION,
			viewMode: "grid",
			status: "all",
			timeFilter: "all",
			dateFrom: "",
			dateTo: "",
			selectedCategories: [],
			minToolCount: 0,
			maxToolCount: 1000,
			featuredOnly: false,
			hasToolsOnly: false,
			tags: [],
			...params,
		})
	} catch (error) {
		console.warn("Parameter validation failed, using defaults:", error)
		return {
			search: "",
			page: DEFAULT_PAGE,
			pageSize: DEFAULT_PAGE_SIZE,
			sortBy: DEFAULT_SORT as CategorySortField,
			sortDirection: DEFAULT_SORT_DIRECTION as SortDirection,
			viewMode: "grid" as ViewMode,
			status: "all" as CategoryStatusFilter,
			timeFilter: "all" as TimeFilter,
			dateFrom: "",
			dateTo: "",
			selectedCategories: [],
			minToolCount: 0,
			maxToolCount: 1000,
			featuredOnly: false,
			hasToolsOnly: false,
			tags: [],
		}
	}
}

/**
 * Generates a human-readable description of current filters
 * Useful for displaying active filter summaries to users
 */
export function getFilterDescription(params: CategorySearchParams): string {
	const filters: string[] = []

	if (params.search) {
		filters.push(`searching for "${params.search}"`)
	}

	if (params.status !== "all") {
		filters.push(`status: ${params.status}`)
	}

	if (params.featuredOnly) {
		filters.push("featured only")
	}

	if (params.hasToolsOnly) {
		filters.push("with tools only")
	}

	if (params.tags.length > 0) {
		filters.push(`tags: ${params.tags.join(", ")}`)
	}

	if (params.minToolCount > 0 || params.maxToolCount < 1000) {
		filters.push(`tools: ${params.minToolCount}-${params.maxToolCount}`)
	}

	if (filters.length === 0) {
		return "Showing all categories"
	}

	return `Filtered by: ${filters.join(", ")}`
}

/**
 * Export type for external usage
 */
export type { CategorySearchParams as CategorySearchParamsType }
