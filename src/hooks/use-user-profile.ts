import { authClient, useSession } from "@/auth/auth-client"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

/**
 * Provides user profile data, authentication status, user status flags, and action handlers for managing user-related actions in a React/Next.js application.
 *
 * Returns user information (ID, name, email, image, verification status, initials, join date), authentication and loading states, error handling, user status flags (new user, verified, has image), navigation handlers (sign in, sign out, manage account, settings), and clipboard utilities for copying email or name. All actions include user feedback via toast notifications.
 *
 * @returns An object containing user data, authentication and loading states, error and status flags, action handlers, and clipboard utilities.
 */
export function useUserProfile() {
	const { data: session, error, isPending } = useSession()
	const router = useRouter()
	const [isSigningOut, setIsSigningOut] = useState(false)
	const [isSigningIn, setIsSigningIn] = useState(false)

	// Enhanced user initials generation
	const getUserInitials = useCallback((name: string | null) => {
		if (!name) return "U"

		const words = name.trim().split(/\s+/)
		if (words.length === 1) {
			return words[0].charAt(0).toUpperCase()
		}

		return words
			.slice(0, 2) // Take first two words only
			.map((word) => word.charAt(0).toUpperCase())
			.join("")
	}, [])

	// Enhanced sign-in handler
	const handleSignIn = useCallback(async () => {
		setIsSigningIn(true)
		try {
			// Redirect to sign-in page
			router.push("/auth/enter")
		} catch (err) {
			console.error("Sign in navigation error:", err)
			toast.error("Failed to navigate to sign-in page")
		} finally {
			setIsSigningIn(false)
		}
	}, [router])

	// Enhanced sign-out handler with better UX
	const handleSignOut = useCallback(async () => {
		setIsSigningOut(true)

		try {
			await authClient.signOut()
			toast.success("Successfully signed out")
			router.push("/auth/enter")
		} catch (err) {
			console.error("Sign out error:", err)
			toast.error("Failed to sign out. Please try again.")
		} finally {
			setIsSigningOut(false)
		}
	}, [router])

	// Enhanced navigation handlers
	const handleManageAccount = useCallback(() => {
		if (!session?.user) {
			toast.error("Please sign in to manage your account")
			return
		}
		router.push("/account/manage")
	}, [router, session])

	const handleSettings = useCallback(() => {
		if (!session?.user) {
			toast.error("Please sign in to access settings")
			return
		}
		router.push("/settings")
	}, [router, session])

	// Enhanced profile data
	const profileData = session?.user
		? {
				id: session.user.id,
				name: session.user.name || "Anonymous User",
				email: session.user.email,
				image: session.user.image,
				emailVerified: session.user.emailVerified || false,
				initials: getUserInitials(session.user.name),
				joinedDate: session.user.createdAt
					? new Date(session.user.createdAt)
					: null,
		  }
		: null

	return {
		// User data
		user: profileData,
		isAuthenticated: !!session && !!session.user,
		userInitials: profileData?.initials || "U",

		// Loading states
		isLoading: isPending,
		isSigningOut,
		isSigningIn,

		// Error handling
		error,
		hasError: !!error,

		// Enhanced user status
		userStatus: {
			isNewUser: profileData?.joinedDate
				? Date.now() - profileData.joinedDate.getTime() <
				  7 * 24 * 60 * 60 * 1000
				: false, // Less than 7 days
			isVerified: profileData?.emailVerified || false,
			hasImage: !!profileData?.image,
		},

		// Action handlers
		handleSignIn,
		handleSignOut,
		handleManageAccount,
		handleSettings,

		// Utility functions
		copyEmail: useCallback(async () => {
			if (!profileData?.email) {
				toast.error("No email to copy")
				return
			}

			try {
				await navigator.clipboard.writeText(profileData.email)
				toast.success("Email copied to clipboard")
			} catch (err) {
				console.error("Failed to copy email:", err)
				toast.error("Failed to copy email")
			}
		}, [profileData?.email]),

		copyName: useCallback(async () => {
			if (!profileData?.name) {
				toast.error("No name to copy")
				return
			}

			try {
				await navigator.clipboard.writeText(profileData.name)
				toast.success("Name copied to clipboard")
			} catch (err) {
				console.error("Failed to copy name:", err)
				toast.error("Failed to copy name")
			}
		}, [profileData?.name]),
	}
}
