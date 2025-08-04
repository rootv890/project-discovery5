# Professional URL-Based State Management System

A comprehensive, production-ready URL-based state management system for React applications built with Next.js 13+, TypeScript, and TRPC. This system demonstrates enterprise-level patterns for managing complex UI state through URL parameters.

## 🌟 Key Features

### **🔗 Complete URL Synchronization**

- All UI state automatically syncs with URL parameters
- Shareable, bookmarkable URLs that preserve exact application state
- Browser back/forward navigation works perfectly
- SEO-friendly URLs with meaningful parameter names

### **🎯 Type-Safe Parameter Management**

- Full TypeScript support with comprehensive type definitions
- Runtime validation using Zod schemas
- Automatic parameter parsing and serialization
- Intelligent default values and fallback handling

### **⚡ Performance Optimized**

- Debounced search input to prevent excessive API calls
- Smart pagination reset when filters change
- Efficient re-renders with proper memoization
- Server-side rendering with immediate state availability

### **♿ Accessibility First**

- Full ARIA support for screen readers
- Keyboard navigation throughout
- Proper semantic HTML structure
- Loading states and error announcements

### **📱 Responsive Design**

- Mobile-first approach with adaptive layouts
- Different view modes (grid, list, compact)
- Touch-friendly controls and interactions
- Collapsible filter sections for mobile

## 🏗️ System Architecture

```
src/modules/categories/
├── params.ts                    # Core URL parameter definitions
├── components/
│   ├── CategoryFilters.tsx      # Advanced filter interface
│   ├── CategoryList.tsx         # Server-side data integration
│   ├── ViewModeToggle.tsx       # View mode switching
│   ├── SortControls.tsx         # Intelligent sorting
│   ├── Pagination.tsx           # Smart pagination
│   ├── FilterSummary.tsx        # Active filters display
│   ├── CategorySkeleton.tsx     # Loading states
│   ├── EmptyState.tsx           # No results handling
│   └── ErrorState.tsx           # Error handling
└── server/
    └── procedures.ts            # TRPC integration
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install nuqs zod
# or
pnpm add nuqs zod
```

### 2. Basic Implementation

```typescript
// pages/categories.tsx
import { loadCategoryParams } from "@/modules/categories/params"

export default async function CategoriesPage({ searchParams }) {
	const params = await loadCategoryParams(searchParams)

	return (
		<div>
			<CategoryFilters />
			<CategoryList searchParams={params} />
		</div>
	)
}
```

### 3. Client-Side Usage

```typescript
"use client"
import { useQueryStates } from "nuqs"
import { categorySearchParams } from "@/modules/categories/params"

export function MyComponent() {
	const [params, setParams] = useQueryStates(categorySearchParams)

	const handleFilterChange = (newFilter: string) => {
		setParams({
			search: newFilter,
			page: 1, // Reset pagination
		})
	}

	return <FilterInterface onFilter={handleFilterChange} />
}
```

## 🔧 Configuration

### Parameter Types

The system supports comprehensive parameter types:

```typescript
export interface CategorySearchParams {
	// Basic parameters
	search: string // Full-text search
	page: number // Pagination (1-indexed)
	pageSize: number // Items per page

	// Sorting
	sortBy: CategorySortField // Field to sort by
	sortDirection: SortDirection // asc/desc

	// View and filters
	viewMode: ViewMode // grid/list/compact
	status: CategoryStatusFilter // all/active/draft/archived
	timeFilter: TimeFilter // all/today/week/month/year/custom

	// Advanced filters
	featuredOnly: boolean // Show only featured items
	hasToolsOnly: boolean // Show only categories with tools
	minToolCount: number // Minimum tool count
	maxToolCount: number // Maximum tool count
	tags: string[] // Multi-select tags

	// Date range (for custom time filter)
	dateFrom: string // ISO 8601 date string
	dateTo: string // ISO 8601 date string

	// Multi-select
	selectedCategories: string[] // For bulk operations
}
```

### Smart Defaults

The system includes intelligent default behaviors:

```typescript
// Different sort fields have logical default directions
const fieldDefaults: Record<CategorySortField, SortDirection> = {
	name: "asc", // Alphabetical: A→Z
	createdAt: "desc", // Dates: newest first
	toolCount: "desc", // Numbers: highest first
	popularity: "desc", // Most popular first
}
```

## 🎨 UI Components

### Advanced Filter Interface

The `CategoryFilters` component provides:

- **Debounced Search**: 300ms delay prevents excessive API calls
- **Collapsible Sections**: Organized with Accordion UI
- **Smart Resets**: Pagination resets when filters change
- **Visual Feedback**: Active filter count and clear actions

```typescript
// Real-time URL synchronization
const [params, setParams] = useQueryStates(categorySearchParams)

const handleSearchChange = useCallback(
	(value: string) => {
		setParams({
			search: value,
			page: 1, // Smart reset
		})
	},
	[setParams]
)
```

### Professional Pagination

Features include:

- **Smart Ellipsis**: Shows `[1] ... [current-1] [current] [current+1] ... [last]`
- **Bounds Checking**: Prevents invalid page navigation
- **Mobile Responsive**: Adaptive controls for different screen sizes
- **Accessibility**: Full ARIA support and keyboard navigation

### Loading States

The skeleton system adapts to different view modes:

- **Grid View**: Card-style skeletons with proper proportions
- **List View**: Horizontal layout with detailed placeholders
- **Compact View**: Minimal skeletons for dense layouts

## 🔌 TRPC Integration

### Server-Side Procedures

```typescript
// Enhanced TRPC procedure with URL parameter support
export const categoriesProcedure = createTRPCRouter({
	getManyForSidebar: protectedProcedure
		.input(getManyInputSchema)
		.query(async ({ ctx, input }) => {
			// Type-safe parameter access
			const { page, pageSize, search, sortBy, sortDirection } = input

			// Build dynamic where clause based on parameters
			const whereClause = buildWhereClause(input)

			const data = await db.query.categories.findMany({
				where: whereClause,
				offset: (page - 1) * pageSize,
				limit: pageSize,
				orderBy: buildOrderBy(sortBy, sortDirection),
			})

			return {
				items: data,
				meta: {
					total: totalCount,
					totalPages: Math.ceil(totalCount / pageSize),
					page,
					pageSize,
				},
			}
		}),
})
```

### Client-Side Data Fetching

```typescript
// Server component with automatic parameter parsing
export async function CategoryList({ searchParams }) {
	try {
		const categoriesData = await trpc.categories.getManyForSidebar.query({
			page: searchParams.page,
			pageSize: searchParams.pageSize,
			// All parameters are type-safe and validated
		})

		return <CategoryGrid categories={categoriesData.items} />
	} catch (error) {
		return <ErrorState error={error} />
	}
}
```

## 🎯 Advanced Patterns

### Filter State Management

```typescript
// Centralized filter logic with smart defaults
const handleBooleanFilter = useCallback(
	(key: "featuredOnly" | "hasToolsOnly", value: boolean) => {
		setParams({
			[key]: value,
			page: 1, // Always reset pagination
		})
	},
	[setParams]
)

// Tag management with array operations
const handleTagToggle = useCallback(
	(tag: string) => {
		const currentTags = params.tags
		const newTags = currentTags.includes(tag)
			? currentTags.filter((t) => t !== tag)
			: [...currentTags, tag]

		setParams({ tags: newTags, page: 1 })
	},
	[params.tags, setParams]
)
```

### URL-Based Metadata

```typescript
// Dynamic metadata generation based on URL state
export async function generateMetadata({ searchParams }) {
	const params = await loadCategoryParams(searchParams)

	let title = "Categories"
	if (params.search) title = `Categories: "${params.search}"`
	if (params.status !== "all") title += ` (${params.status})`
	if (params.page > 1) title += ` - Page ${params.page}`

	return {
		title,
		description: getFilterDescription(params),
		openGraph: { title, description },
		robots: { index: params.page <= 10 }, // SEO optimization
	}
}
```

## 🧪 Testing Patterns

### URL Parameter Testing

```typescript
// Test URL parameter parsing
describe("Category Parameters", () => {
	it("should parse valid parameters correctly", async () => {
		const searchParams = {
			search: "ai tools",
			page: "2",
			sortBy: "name",
			featuredOnly: "true",
		}

		const params = await loadCategoryParams(searchParams)

		expect(params.search).toBe("ai tools")
		expect(params.page).toBe(2)
		expect(params.featuredOnly).toBe(true)
	})

	it("should handle invalid parameters gracefully", async () => {
		const searchParams = { page: "invalid" }
		const params = await loadCategoryParams(searchParams)

		expect(params.page).toBe(DEFAULT_PAGE) // Falls back to default
	})
})
```

### Component Integration Testing

```typescript
// Test URL synchronization
describe("CategoryFilters", () => {
	it("should update URL when search changes", async () => {
		render(<CategoryFilters />)

		const searchInput = screen.getByLabelText("Search Categories")
		await user.type(searchInput, "productivity")

		// Wait for debounce
		await waitFor(() => {
			expect(window.location.search).toContain("search=productivity")
		})
	})
})
```

## 🚀 Performance Optimizations

### Debounced Inputs

- Search input debounced at 300ms to prevent excessive API calls
- Smart batching of parameter updates
- Efficient re-render prevention with proper memoization

### Server-Side Rendering

- Parameters parsed on server for immediate state availability
- SEO-friendly URLs with meaningful metadata
- Proper hydration without client-server mismatches

### Caching Strategy

- TRPC queries cached based on parameter combinations
- Intelligent cache invalidation when parameters change
- Optimistic updates for better perceived performance

## 🔐 Security Considerations

### Parameter Validation

- All parameters validated with Zod schemas
- Bounds checking for numeric values (page, pageSize)
- Array length limits to prevent DoS attacks
- SQL injection prevention through parameterized queries

### Access Control

- Server-side authentication checks in TRPC procedures
- Rate limiting on search endpoints
- Proper error handling without information leakage

## 📚 Best Practices

### 1. **Always Reset Pagination**

```typescript
// When any filter changes, reset to page 1
setParams({
	search: newSearch,
	page: 1, // Critical for good UX
})
```

### 2. **Use Meaningful Parameter Names**

```typescript
// Good: descriptive and clear
?search=productivity&viewMode=grid&featuredOnly=true

// Bad: cryptic abbreviations
?q=prod&vm=g&fo=1
```

### 3. **Provide Clear Defaults**

```typescript
// Always define sensible defaults
const DEFAULT_PAGE_SIZE = 12 // Not too many, not too few
const DEFAULT_SORT = "name" // Predictable ordering
```

### 4. **Handle Edge Cases**

```typescript
// Graceful handling of invalid parameters
const sanitizeParams = (params) => {
	return {
		page: Math.max(1, params.page || 1),
		pageSize: Math.min(100, Math.max(5, params.pageSize || 12)),
		// ... other validations
	}
}
```

## 🤝 Contributing

This system is designed to be extended and customized. Key extension points:

1. **Add New Parameter Types**: Extend the `CategorySearchParams` interface
2. **Custom Validation**: Add new Zod schemas for complex parameters
3. **New Filter Components**: Follow the established patterns for consistency
4. **Additional View Modes**: Extend the `ViewMode` enum and update components

## 📄 License

This professional URL-based state management system is available under the MIT License.

## 🙏 Acknowledgments

Built with:

- [nuqs](https://nuqs.47ng.com/) - Type-safe URL state management
- [Zod](https://zod.dev/) - Runtime type validation
- [TRPC](https://trpc.io/) - End-to-end type safety
- [Next.js 13+](https://nextjs.org/) - React framework with app router
- [TypeScript](https://www.typescriptlang.org/) - Type safety throughout

---

This system represents enterprise-level URL-based state management with comprehensive TypeScript support, professional error handling, accessibility features, and production-ready performance optimizations.
