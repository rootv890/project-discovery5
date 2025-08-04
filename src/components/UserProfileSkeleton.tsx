import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface UserProfileSkeletonProps {
	className?: string
	size?: "sm" | "md" | "lg"
}

/**
 * Renders a circular skeleton placeholder for a user profile image with configurable size.
 *
 * @param className - Additional CSS classes to apply to the skeleton
 * @param size - The size of the skeleton ("sm", "md", or "lg"); defaults to "md"
 */
export function UserProfileSkeleton({
	className,
	size = "md",
}: UserProfileSkeletonProps) {
	const sizeClasses = {
		sm: "size-8",
		md: "size-10",
		lg: "size-12",
	}

	return (
		<Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
	)
}
