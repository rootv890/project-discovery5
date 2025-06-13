"use client"

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
import { motion } from "motion/react"
import { useState } from "react"

export default function SignIn() {
	const [loading, setLoading] = useState(false)

	const handleGoogleSignIn = async () => {
		setLoading(true)
		try {
			await signInWithGoogle()
		} finally {
			setLoading(false)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50, filter: "blur(px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
			className="min-h-screen w-full flex items-center justify-center  p-4"
		>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
			>
				<Card className="max-w-sm bg-surface rounded-2xl w-full border-none shadow-2xl text-on-primary-container">
					<CardHeader>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
						>
							<CardTitle className="text-lg md:text-2xl">
								Sign In to your account
							</CardTitle>
							<CardDescription className="text-xs md:text-sm">
								Access your dashboard and manage your projects.
							</CardDescription>
						</motion.div>
					</CardHeader>

					<CardContent>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.5 }}
							className="grid gap-4"
						>
							<div className="w-full flex justify-center">
								<Button
									onClick={handleGoogleSignIn}
									disabled={loading}
									className={cn(
										"w-full flex items-center justify-center gap-2",
										"rounded-lg text-white disabled:bg-primary-container hover:bg-primary/90",
										"text-base font-medium p-5 transition-all",
										"shadow-md disabled:opacity-75",
										"relative overflow-hidden"
									)}
								>
									{loading ? (
										<>
											<Loader2 className="animate-spin" />
											<span className="relative z-10 text-white">
												Signing in…
											</span>
										</>
									) : (
										<>
											<Google
												size={24}
												variant="Bold"
											/>
											<span>Continue with Google</span>
										</>
									)}
								</Button>
							</div>
						</motion.div>
					</CardContent>

					<CardFooter>
						<motion.p
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.5 }}
							className="px-8 text-center text-xs text-muted-foreground"
						>
							By signing in, you agree to our Terms of Service and Privacy
							Policy.
						</motion.p>
					</CardFooter>
				</Card>
			</motion.div>
		</motion.div>
	)
}
