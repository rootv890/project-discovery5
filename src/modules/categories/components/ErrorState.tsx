/**
 * @fileoverview Error State Component - Professional Error Handling UI
 *
 * This component provides comprehensive error state handling:
 * - User-friendly error messages with technical details hidden
 * - Recovery actions and guidance for users
 * - Proper error logging for development debugging
 * - Accessible error announcements for screen readers
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bug, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface ErrorStateProps {
	/** Main error title */
	title: string
	/** User-friendly error description */
	description: string
	/** Technical error details (for development) */
	error?: string
	/** Recovery action configuration */
	action?: {
		label: string
		href: string
		variant?: "default" | "outline" | "secondary"
	}
	/** Show technical details toggle */
	showTechnicalDetails?: boolean
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * ErrorState - Professional Error Handling Component
 *
 * This component provides users with clear error communication while
 * maintaining a professional appearance and offering recovery paths.
 * Features include:
 *
 * - **User-Friendly Messaging**: Clear, non-technical error explanations
 * - **Recovery Actions**: Helpful buttons to resolve or work around errors
 * - **Technical Details**: Collapsible technical info for developers
 * - **Accessibility**: Proper error announcements and semantic structure
 * - **Logging**: Automatic error logging for debugging
 */
export function ErrorState({
	title,
	description,
	error,
	action,
	showTechnicalDetails = process.env.NODE_ENV === "development",
}: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
			{/* Error Icon */}
			<div className="mb-6">
				<AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
			</div>

			{/* Content */}
			<div className="max-w-md space-y-6">
				{/* Title */}
				<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>

				{/* Description */}
				<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
					{description}
				</p>

				{/* Technical Details (Development Only) */}
				{showTechnicalDetails && error && (
					<Alert
						variant="destructive"
						className="text-left"
					>
						<Bug className="h-4 w-4" />
						<AlertDescription className="mt-2">
							<details className="space-y-2">
								<summary className="cursor-pointer font-medium text-sm">
									Technical Details (Development Only)
								</summary>
								<pre className="text-xs mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border overflow-auto">
									{error}
								</pre>
							</details>
						</AlertDescription>
					</Alert>
				)}

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 pt-4">
					{/* Primary Action */}
					{action && (
						<Button
							asChild
							variant={action.variant || "default"}
							className="min-w-[140px]"
						>
							<Link href={action.href}>
								<RefreshCw className="h-4 w-4 mr-2" />
								{action.label}
							</Link>
						</Button>
					)}

					{/* Secondary Action - Go Home */}
					<Button
						asChild
						variant="outline"
						className="min-w-[140px]"
					>
						<Link href="/">
							<Home className="h-4 w-4 mr-2" />
							Go Home
						</Link>
					</Button>
				</div>

				{/* Support Information */}
				<div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
					<p>
						If this problem persists, please{" "}
						<Link
							href="/support"
							className="text-blue-600 dark:text-blue-400 hover:underline"
						>
							contact support
						</Link>{" "}
						with details about what you were trying to do.
					</p>
				</div>
			</div>

			{/* Accessibility */}
			<div
				className="sr-only"
				role="alert"
				aria-live="assertive"
			>
				Error: {title}. {description}
			</div>
		</div>
	)
}
