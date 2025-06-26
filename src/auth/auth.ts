import { db } from "@/db/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { env } from "process"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			prompt: "select_account",
			redirectURI: `${env.NEXT_PUBLIC_URL}/api/auth/callback/google`,
		},
	},
})
