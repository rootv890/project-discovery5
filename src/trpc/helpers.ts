import { auth } from "@/auth/auth"
import { headers } from "next/headers"
export async function isAuthenticated() {
	// check for session and user if yes return true
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		return false
	}
	return true
}
