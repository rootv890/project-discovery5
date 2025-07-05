import SignIn from "@/modules/auth/SignIn"
import { isAuthenticated } from "@/trpc/helpers"
import { redirect } from "next/navigation"
import React from "react"

const SignInPage = async () => {
	// Check if user is authenticated
	const isLoggedin = await isAuthenticated()
	if (isLoggedin) {
		redirect("/")
	}
	return <SignIn />
}

export default SignInPage
