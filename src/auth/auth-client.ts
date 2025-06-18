import { createAuthClient } from "better-auth/client"
export const authClient = createAuthClient()

// const signIn = async () => {
// 	const data = await authClient.signIn.social({
// 		provider: "google",
// 	})

// 	return data
// }

const { useSession, deleteUser, signOut, accountInfo, signIn } = authClient
export { accountInfo, deleteUser, signIn, signOut, useSession }
