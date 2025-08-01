import { authClient, useSession } from "@/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function useUserProfile() {
	const { data: session, error } = useSession()
	const router = useRouter()
	const [isSigningOut, setIsSigningOut] = useState(false)
	const [isLoading, setIsLoading] = useState(!session)

	return {
		user: session?.user,
		isAuthenticated: !!session,
		userInitials: session?.user.name
			? session.user.name
					.split(" ")
					.map((n: any) => n[0])
					.join("")
			: "U",
		isLoading: !session || isLoading,
		isSigningOut: false, // Placeholder for signing out state
		error: null, // Placeholder for error state
		handleSignOut: () => {
			setIsSigningOut(true)
			authClient
				.signOut()
				.then(() => {
					router.push("/auth/enter")
				})
				.catch((err) => {
					console.error("Sign out error:", err)
				})
				.finally(() => {
					setIsSigningOut(false)
				})
		},
		handleManageAccount: () => {
			router.push("/account/manage")
		},
		handleSettings: () => {
			console.log("Settings clicked")
		},
	}
}
