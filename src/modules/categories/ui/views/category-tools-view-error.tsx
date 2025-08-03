import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/ui/responsive-grid"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

type CategoryToolsViewErrorProps = {
	error: Error
	resetErrorBoundary: () => void
}

const CategoryToolsViewError = ({
	error,
	resetErrorBoundary,
}: CategoryToolsViewErrorProps) => {
	return (
		<ResponsiveContainer
			maxWidth="7xl"
			className="py-8"
		>
			<div className="space-y-8">
				{/* Header Section */}
				<div className="space-y-6">
					{/* Back Navigation */}
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="sm"
							asChild
							className="gap-2"
						>
							<Link href="/">
								<ArrowLeft className="h-4 w-4" />
								Back to Dashboard
							</Link>
						</Button>
					</div>
				</div>

				{/* Error State */}
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
						<AlertCircle className="h-12 w-12 text-destructive" />
					</div>

					<h1 className="text-2xl font-bold mb-2">Something went wrong</h1>

					<p className="text-muted-foreground mb-6 max-w-md">
						We encountered an error while loading the tools for this category.
						This might be due to a network issue or server problem.
					</p>

					{/* Error Details (for development) */}
					{process.env.NODE_ENV === "development" && (
						<details className="mb-6 text-left bg-muted p-4 rounded-lg max-w-lg">
							<summary className="cursor-pointer font-medium text-sm">
								Error Details (Development)
							</summary>
							<pre className="mt-2 text-xs text-destructive whitespace-pre-wrap">
								{error.message}
								{error.stack && `\n\n${error.stack}`}
							</pre>
						</details>
					)}

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3">
						<Button
							onClick={resetErrorBoundary}
							className="gap-2"
						>
							<RefreshCw className="h-4 w-4" />
							Try Again
						</Button>

						<Button
							variant="outline"
							asChild
						>
							<Link href="/">Go to Dashboard</Link>
						</Button>
					</div>
				</div>
			</div>
		</ResponsiveContainer>
	)
}

export default CategoryToolsViewError
