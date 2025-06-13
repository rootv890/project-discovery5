"use server"
import env from "../../env"
import { authClient } from "./auth-client"

export const signInWithGoogle = async () => {
	return await authClient.signIn.social({
		provider: "google",
		callbackURL: `${env.NEXT_PUBLIC_URL}/api/auth/callback/google`,
		newUserCallbackURL: `${env.NEXT_PUBLIC_URL}/welcome`,
	})
}
