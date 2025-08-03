/**
 * @fileoverview Empty State Component - User-Friendly No Results UI
 *
 * This component provides professional empty state handling:
 * - Context-aware messaging based on current filters
 * - Clear call-to-action buttons for user guidance
 * - Accessible design with proper ARIA labels
 * - Consistent styling with the overall design system
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { Button } from "@/components/ui/button"
import { Filter, Plus, RefreshCw, Search } from "lucide-react"
import Link from "next/link"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface EmptyStateProps {
	/** Main heading text */
	title: string
	/** Descriptive text explaining the empty state */
	description: string
	/** Optional action button configuration */
	action?: {
		label: string
		href: string
		variant?: "default" | "outline" | "secondary"
	}
	/** Optional icon to display */
	icon?: "search" | "filter" | "plus" | "refresh"
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * EmptyState - Professional No Results Component
 *
 * This component provides users with helpful guidance when no content
 * is available, whether due to filters, search queries, or genuinely
 * empty data sets. Features include:
 *
 * - **Context-Aware Messaging**: Different messages for different scenarios
 * - **Clear Actions**: Helpful buttons to guide users to next steps
 * - **Visual Appeal**: Professional icons and spacing
 * - **Accessibility**: Proper semantic structure and ARIA labels
 */
export function EmptyState({
	title,
	description,
	action,
	icon = "search",
}: EmptyStateProps) {
	/**
	 * Get appropriate icon component based on prop
	 */
	const getIcon = () => {
		const iconProps = {
			className: "h-12 w-12 text-gray-400 dark:text-gray-500",
		}

		switch (icon) {
			case "filter":
				return <Filter {...iconProps} />
			case "plus":
				return <Plus {...iconProps} />
			case "refresh":
				return <RefreshCw {...iconProps} />
			case "search":
			default:
				return <Search {...iconProps} />
		}
	}

	return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
			{/* Icon */}
			<div className="mb-6">{getIcon()}</div>

			{/* Content */}
			<div className="max-w-md space-y-4">
				{/* Title */}
				<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>

				{/* Description */}
				<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
					{description}
				</p>

				{/* Action Button */}
				{action && (
					<div className="pt-4">
						<Button
							asChild
							variant={action.variant || "default"}
							className="min-w-[140px]"
						>
							<Link href={action.href}>{action.label}</Link>
						</Button>
					</div>
				)}
			</div>

			{/* Accessibility */}
			<div
				className="sr-only"
				role="status"
				aria-live="polite"
			>
				{title}. {description}
			</div>
		</div>
	)
}
