// ============================================================================
// ERROR HANDLING COMPONENTS
// ============================================================================
export type ErrorFallbackProps = {
	error: Error
	resetErrorBoundary: () => void
}

export const CategoriesSidebarErrorFallback = ({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) => {
	return (
		<div className="p-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
			<p className="font-semibold">Something went wrong 😞</p>
			<p className="mt-1 text-xs text-red-500">{error.message}</p>
			<button
				onClick={resetErrorBoundary}
				className="mt-3 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-1.5 text-white hover:bg-red-700 text-xs"
			>
				Try Again
			</button>
		</div>
	)
}
