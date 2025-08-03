/**
 * @fileoverview Dashboard Types - Core Type Definitions
 *
 * Centralized type definitions for the dashboard module including:
 * - API response types
 * - Component prop interfaces
 * - Filter and pagination types
 * - TRPC input/output schemas
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { z } from "zod"

// =============================================================================
// TOOL TYPES
// =============================================================================

export interface Tool {
	id: string
	name: string
	subtitle: string | null
	slug: string
	imageUrl: string | null
	description: string | null
	pricing:
		| "free"
		| "free open source"
		| "paid"
		| "freemium"
		| "subscription"
		| "one-time"
	status: "draft" | "pending_review" | "approved" | "rejected" | null
	createdAt: string
	updatedAt: string
}

export interface ToolsResponse {
	items: Tool[]
	meta: {
		total: number
		totalPages: number
		page: number
		pageSize: number
		hasNextPage: boolean
		hasPreviousPage: boolean
	}
}

// =============================================================================
// FILTER OPTIONS TYPES
// =============================================================================

export interface FilterCategory {
	id: string
	name: string
	slug: string
	toolCount: number
}

export interface FilterPlatform {
	id: string
	name: string
	slug: string
	toolCount: number
}

export interface FilterTag {
	id: string
	name: string
	slug: string
	color: string | null
	toolCount: number
}

export interface FilterOptions {
	categories: FilterCategory[]
	platforms: FilterPlatform[]
	tags: FilterTag[]
}

// =============================================================================
// STATISTICS TYPES
// =============================================================================

export interface ToolsStats {
	total: number
	approved: number
	draft: number
	pendingReview: number
	free: number
	paid: number
	freemium: number
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface ToolsGridSkeletonProps {
	view: "grid" | "list"
	count?: number
}

export interface ToolsErrorProps {
	error: Error
	onRetry: () => void
}

export interface ToolsEmptyStateProps {
	hasFilters: boolean
	onClearFilters: () => void
}

export interface DashboardStatsProps {
	className?: string
}

// =============================================================================
// SEARCH PARAMS TYPES
// =============================================================================

export type ToolStatus =
	| "all"
	| "draft"
	| "pending_review"
	| "approved"
	| "rejected"

export type ToolPricing =
	| "all"
	| "free"
	| "free open source"
	| "paid"
	| "freemium"
	| "subscription"
	| "one-time"

export type SortField = "name" | "createdAt" | "updatedAt" | "pricing"

export type SortDirection = "asc" | "desc"

export type ViewMode = "grid" | "list"

// =============================================================================
// FILTER SUMMARY TYPES
// =============================================================================

export interface FilterSummary {
	count: number
	labels: string[]
}

// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================

export const toolStatusSchema = z.enum([
	"all",
	"draft",
	"pending_review",
	"approved",
	"rejected",
])

export const toolPricingSchema = z.enum([
	"all",
	"free",
	"free open source",
	"paid",
	"freemium",
	"subscription",
	"one-time",
])

export const sortFieldSchema = z.enum([
	"name",
	"createdAt",
	"updatedAt",
	"pricing",
])

export const sortDirectionSchema = z.enum(["asc", "desc"])

export const viewModeSchema = z.enum(["grid", "list"])
