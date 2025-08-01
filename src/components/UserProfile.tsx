"use client"

import { authClient, useSession } from "@/auth/auth-client"
import { Button } from "@/components/ui/button"
import { UserProfileDropdown } from "@/components/UserProfileDropdown"
import { UserProfileSkeleton } from "@/components/UserProfileSkeleton"
import { useUserProfile } from "@/hooks/use-user-profile"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import Link from "next/link"

export interface UserProfileProps {
	/** Size of the profile button */
	size?: "sm" | "md" | "lg"
	/** Alignment of the dropdown menu */
	align?: "start" | "center" | "end"
	/** Side of the dropdown menu */
	side?: "top" | "right" | "bottom" | "left"
	/** Custom className */
	className?: string
	/** Show sign in button when not authenticated */
	showSignInButton?: boolean
	/** Custom sign in URL */
	signInUrl?: string
}

export function UserProfile({
	size = "md",
	align = "end",
	side = "bottom",
	className,
	showSignInButton = true,
	signInUrl = "/auth/enter",
}: UserProfileProps) {
	const {
		user,
		isAuthenticated,
		userInitials,
		isLoading,
		isSigningOut,
		error,
		handleSignOut,
		handleManageAccount,
		handleSettings,
	} = useUserProfile()

	// Loading state
	if (isLoading) {
		return (
			<UserProfileSkeleton
				size={size}
				className={className}
			/>
		)
	}

	// Error state (still show sign in option)
	if (error && !isAuthenticated) {
		console.error("Auth error:", error)
	}

	// Not authenticated - show sign in button
	if (!isAuthenticated) {
		if (!showSignInButton) {
			return null
		}

		return (
			<Button
				asChild
				variant="filled"
				// size={size === "sm" ? "sm" : "default"}
				className={cn("gap-2", className)}
			>
				<Link href={signInUrl}>
					<User className={cn(size === "sm" ? "size-3" : "size-4")} />
					<span className="hidden sm:inline">Sign in</span>
				</Link>
			</Button>
		)
	}

	// Authenticated - show profile dropdown
	return (
		<div className={className}>
			<UserProfileDropdown
				user={user!}
				userInitials={userInitials}
				isSigningOut={isSigningOut}
				onSignOut={handleSignOut}
				onManageAccount={handleManageAccount}
				onSettings={handleSettings}
				size={size}
				align={align}
				side={side}
			/>
		</div>
	)
}

// Export the hook for advanced usage
export { useUserProfile } from "@/hooks/use-user-profile"
