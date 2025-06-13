import "dotenv/config"
import { authClient } from "./auth-client"
export const signOut = async () => {
	return await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				window.location.href = `${process.env.NEXT_PUBLIC_URL}/`
			},
		},
	})
}
