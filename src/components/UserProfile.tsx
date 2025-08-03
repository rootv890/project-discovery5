"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserProfile } from "@/hooks/use-user-profile"
import { CalendarDays, Mail, MapPin, Users } from "lucide-react"
import { useState } from "react"

interface UserProfileProps {
	userId?: string
	variant?: "default" | "compact" | "detailed"
	showActions?: boolean
	className?: string
}

export function UserProfile({
	userId,
	variant = "default",
	showActions = true,
	className = "",
}: UserProfileProps) {
	const [isFollowing, setIsFollowing] = useState(false)

	// Use the existing user profile hook instead of TRPC
	const { user, isLoading, error } = useUserProfile()

	// If a specific userId is provided but it doesn't match current user, show not found
	// In a real app, you'd fetch that specific user's data from your backend
	if (userId && user?.id !== userId) {
		return (
			<Card className={`w-full max-w-md ${className}`}>
				<CardContent className="flex items-center justify-center py-8">
					<p className="text-muted-foreground">
						User profile not available (different user requested)
					</p>
				</CardContent>
			</Card>
		)
	}

	if (isLoading) {
		return <UserProfileSkeleton variant={variant} />
	}

	if (error || !user) {
		return (
			<Card className={`w-full max-w-md ${className}`}>
				<CardContent className="flex items-center justify-center py-8">
					<p className="text-muted-foreground">
						{error ? "Failed to load user profile" : "User not found"}
					</p>
				</CardContent>
			</Card>
		)
	}

	const handleFollow = () => {
		setIsFollowing(!isFollowing)
		// Add your follow/unfollow logic here
	}

	if (variant === "compact") {
		return (
			<div className={`flex items-center space-x-3 ${className}`}>
				<Avatar className="h-10 w-10">
					<AvatarImage
						src={user.image || ""}
						alt={user.name || ""}
					/>
					<AvatarFallback>
						{user.name?.charAt(0)?.toUpperCase() || "U"}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-foreground truncate">
						{user.name}
					</p>
					<p className="text-xs text-muted-foreground truncate">{user.email}</p>
				</div>
			</div>
		)
	}

	return (
		<Card className={`w-full max-w-md ${className}`}>
			<CardHeader className="text-center">
				<div className="flex justify-center mb-4">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src={user.image || ""}
							alt={user.name || ""}
						/>
						<AvatarFallback className="text-2xl">
							{user.name?.charAt(0)?.toUpperCase() || "U"}
						</AvatarFallback>
					</Avatar>
				</div>
				<CardTitle className="text-xl">{user.name}</CardTitle>
				<p className="text-muted-foreground">
					@{user.name?.toLowerCase().replace(/\s+/g, "") || "user"}
				</p>
				{user.bio && (
					<p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
				)}
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex items-center space-x-4 text-sm text-muted-foreground">
					<div className="flex items-center space-x-1">
						<Mail className="h-4 w-4" />
						<span>{user.email}</span>
					</div>
				</div>

				{user.location && (
					<div className="flex items-center space-x-1 text-sm text-muted-foreground">
						<MapPin className="h-4 w-4" />
						<span>{user.location}</span>
					</div>
				)}

				{user.createdAt && (
					<div className="flex items-center space-x-1 text-sm text-muted-foreground">
						<CalendarDays className="h-4 w-4" />
						<span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
					</div>
				)}

				{(user.followers !== undefined || user.following !== undefined) && (
					<div className="flex items-center space-x-4 text-sm">
						{user.following !== undefined && (
							<div className="flex items-center space-x-1">
								<Users className="h-4 w-4" />
								<span>
									<span className="font-semibold">{user.following}</span>{" "}
									Following
								</span>
							</div>
						)}
						{user.followers !== undefined && (
							<div className="flex items-center space-x-1">
								<Users className="h-4 w-4" />
								<span>
									<span className="font-semibold">{user.followers}</span>{" "}
									Followers
								</span>
							</div>
						)}
					</div>
				)}

				{user.skills && user.skills.length > 0 && (
					<div className="space-y-2">
						<Separator />
						<div>
							<p className="text-sm font-medium mb-2">Skills</p>
							<div className="flex flex-wrap gap-1">
								{user.skills.map((skill: string, index: number) => (
									<Badge
										key={index}
										variant="secondary"
										className="text-xs"
									>
										{skill}
									</Badge>
								))}
							</div>
						</div>
					</div>
				)}

				{showActions && (
					<div className="space-y-2 pt-4">
						<Separator />
						<div className="flex space-x-2">
							<Button
								variant={isFollowing ? "outline" : "default"}
								size="sm"
								onClick={handleFollow}
								className="flex-1"
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
							>
								Message
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

function UserProfileSkeleton({ variant }: { variant: string }) {
	if (variant === "compact") {
		return (
			<div className="flex items-center space-x-3">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>
		)
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<div className="flex justify-center mb-4">
					<Skeleton className="h-24 w-24 rounded-full" />
				</div>
				<Skeleton className="h-6 w-32 mx-auto" />
				<Skeleton className="h-4 w-24 mx-auto" />
				<Skeleton className="h-4 w-48 mx-auto mt-2" />
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<div className="flex space-x-2 pt-4">
					<Skeleton className="h-9 flex-1" />
					<Skeleton className="h-9 flex-1" />
				</div>
			</CardContent>
		</Card>
	)
}
