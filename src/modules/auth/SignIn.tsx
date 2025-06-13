"use client"

// import { signInWithGoogle } from "@/auth/sign-in"
import { signIn as signInWithGoogle } from "@/auth/auth-client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Google } from "iconsax-reactjs"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function SignIn() {
	const [loading, setLoading] = useState(false)

	return (
		<Card className="max-w-sm rounded-sm w-full">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">
					Sign In to your account
				</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div
						className={cn(
							"w-full gap-2 flex items-center",
							"justify-between flex-col"
						)}
					>
						<Button
							variant="outline"
							className={cn("w-full gap-2")}
							disabled={loading}
							onClick={async () => {
								setLoading(true)
								await signInWithGoogle()
								setLoading(false)
							}}
						>
							{loading ? (
								<Loader2
									className="animate-spin"
									size={16}
								/>
							) : (
								<>
									<Google
										size={16}
										color="#000"
										variant="Bold"
									/>
									<span>Continue with Google</span>
								</>
							)}
						</Button>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<p className="text-xs text-center text-gray-500">
					Currently, we only support Google sign in for security reasons.
				</p>
			</CardFooter>
		</Card>
	)
}
