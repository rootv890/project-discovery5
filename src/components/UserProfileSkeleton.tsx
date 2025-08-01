import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface UserProfileSkeletonProps {
	className?: string
	size?: "sm" | "md" | "lg"
}

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
