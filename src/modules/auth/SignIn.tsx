"use client"

import { signInWithGoogle } from "@/auth/auth-client"
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
import GridLines from "@/modules/marketing/grid-lines"
import MeshGradient from "@/modules/marketing/mesh-gradient"
import { Google } from "iconsax-reactjs"
import { Compass, Loader2 } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

// Professional auth color palettes
const authColorPalettes = {
	professional: ["#4F46E5", "#7C3AED", "#DB2777"], // Indigo to Purple to Pink
}

export default function SignIn() {
	const [loading, setLoading] = useState(false)
	const [colors, setColors] = useState(authColorPalettes.professional)

	// Rotate through color palettes every 10 seconds for dynamic feel
	useEffect(() => {
		const palettes = Object.values(authColorPalettes)
		let currentIndex = 0

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % palettes.length
			setColors(palettes[currentIndex])
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	const handleGoogleSignIn = async () => {
		setLoading(true)
		try {
			await signInWithGoogle()
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
			{/* Professional Background */}
			<div className="pointer-events-none absolute inset-0 z-0">
				{/* Grid Lines */}
				<GridLines className="opacity-30" />

				{/* Animated Mesh Gradient */}
				<MeshGradient
					colors={colors}
					speed={0.02} // Slower, more professional
					blur={100} // More subtle blur
					grain={true}
					className="absolute top-0 left-0 w-full h-full opacity-90"
				/>

				{/* Subtle overlay for better text contrast */}
				<div className="absolute inset-0 bg-black/10" />

				{/* Radial gradient for focus effect */}
				<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
			</div>

			{/* Floating background elements */}
			<div className="absolute inset-0 z-10 pointer-events-none">
				{/* Floating orbs */}
				<motion.div
					animate={{
						y: [-20, 20, -20],
						x: [-10, 10, -10],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"
				/>
				<motion.div
					animate={{
						y: [20, -20, 20],
						x: [10, -10, 10],
						scale: [1.1, 1, 1.1],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-3/4 right-1/4 w-40 h-40 bg-white/3 rounded-full blur-2xl"
				/>
				<motion.div
					animate={{
						y: [-15, 15, -15],
						x: [-5, 5, -5],
						scale: [1, 1.05, 1],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/8 rounded-full blur-xl"
				/>
			</div>

			{/* Main Content */}
			<motion.div
				initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 0.8, ease: "easeInOut" }}
				className="relative z-20"
			>
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
				>
					<Card
						className={cn(
							"max-w-sm w-full border-none shadow-2xl",
							"bg-white/95 backdrop-blur-xl",
							"text-gray-900",
							"ring-1 ring-white/20",
							"rounded-3xl overflow-hidden",
							"relative"
						)}
					>
						{/* Card glow effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-3xl" />

						<CardHeader className="relative">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.5 }}
								className="text-center"
							>
								{/* Logo/Brand area */}
								<div className=" text-lg font-semibold mx-auto mb-4 flex items-center justify-center gap-2">
									<Compass className="size-6" /> Discovery5
								</div>

								<CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
									Welcome Back
								</CardTitle>
								<CardDescription className="text-gray-600 mt-2">
									Sign in to access your dashboard and continue your journey
								</CardDescription>
							</motion.div>
						</CardHeader>

						<CardContent className="relative px-8">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.5 }}
								className="grid gap-6"
							>
								<Button
									onClick={handleGoogleSignIn}
									disabled={loading}
									className={cn(
										"w-full flex items-center justify-center gap-3",
										"rounded-2xl text-white h-12",
										// "bg-gradient-to-r from-indigo-600 to-purple-600",
										// "hover:from-indigo-700 hover:to-purple-700",
										// "disabled:from-gray-400 disabled:to-gray-500",
										"bg-primary-container hover:bg-primary-container/90",
										"text-base font-semibold",
										"transition-all duration-300",
										"shadow-lg hover:shadow-xl",
										"transform hover:scale-[1.02] active:scale-[0.98]",
										"relative overflow-hidden group"
									)}
								>
									{/* Button shine effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

									{loading ? (
										<>
											<Loader2 className="animate-spin w-5 h-5" />
											<span className="relative z-10">Signing you in...</span>
										</>
									) : (
										<>
											<Google
												size={20}
												variant="Bold"
											/>
											<span className="relative z-10">
												Continue with Google
											</span>
										</>
									)}
								</Button>

								{/* Divider */}
							</motion.div>
						</CardContent>

						<CardFooter className="relative px-8 pb-8">
							<motion.p
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.5 }}
								className="text-center text-xs text-gray-500 leading-relaxed"
							>
								By signing in, you agree to our{" "}
								<a
									href="/terms"
									className="text-primary-container hover:text-primary-container hover:underline"
								>
									Terms of Service
								</a>{" "}
								and{" "}
								<a
									href="/privacy"
									className="text-indigo-600 hover:text-indigo-800 underline"
								>
									Privacy Policy
								</a>
							</motion.p>
						</CardFooter>
					</Card>
				</motion.div>
			</motion.div>
		</div>
	)
}
