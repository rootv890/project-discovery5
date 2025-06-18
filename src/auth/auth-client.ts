import { createAuthClient } from "better-auth/client"
export const authClient = createAuthClient()

const signInWithGoogle = async () => {
	const data = await authClient.signIn.social({
		provider: "google",
	})
	return data
}

const { useSession, deleteUser, signOut, accountInfo } = authClient
export { accountInfo, deleteUser, signOut, useSession, signInWithGoogle }
