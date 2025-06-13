import { createAuthClient } from "better-auth/client"
export const authClient = createAuthClient()

const signIn = async () => {
	const data = await authClient.signIn.social({
		provider: "google",
	})
}

const { useSession, deleteUser, signOut, accountInfo } = authClient
export { accountInfo, deleteUser, signIn, signOut, useSession }
