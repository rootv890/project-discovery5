"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserProfile } from "@/hooks/use-user-profile"
import { ANIMATION_PRESETS, getContextualShape } from "@/lib/shapes"
import { gsap } from "gsap"
import {
	Check,
	Clock,
	Copy,
	LogIn,
	LogOut,
	Settings,
	Shield,
	Sparkles,
	User,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface UserProfileProps {
	size?: "sm" | "md" | "lg"
	className?: string
	maskShape?: string // Allow custom shape selection
	animationStyle?: keyof typeof ANIMATION_PRESETS
}

export function UserProfile({
	size = "md",
	className = "",
	maskShape, // Will be auto-selected based on user status if not provided
	animationStyle = "dramatic",
}: UserProfileProps) {
	const {
		user,
		isAuthenticated,
		isLoading,
		isSigningOut,
		isSigningIn,
		userStatus,
		handleSignIn,
		handleSignOut,
		handleManageAccount,
		handleSettings,
		copyEmail,
		copyName,
	} = useUserProfile()

	const [copiedField, setCopiedField] = useState<string | null>(null)
	const maskRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	// Auto-select shape based on user status if not provided
	const selectedShape =
		maskShape || (userStatus ? getContextualShape(userStatus) : "Circle.svg")

	const sizeClasses = {
		sm: "h-10 w-10",
		md: "h-12 w-12",
		lg: "h-16 w-16",
	}

	// GSAP animation setup with configurable presets
	useEffect(() => {
		if (!maskRef.current || !buttonRef.current) return

		const maskElement = maskRef.current
		const buttonElement = buttonRef.current
		const animationConfig = ANIMATION_PRESETS[animationStyle]

		// Apply the mask to the container
		gsap.set(maskElement, {
			maskImage: `url(/shapes/${selectedShape})`,
			WebkitMaskImage: `url(/shapes/${selectedShape})`,
			maskSize: "cover",
			WebkitMaskSize: "cover",
			maskRepeat: "no-repeat",
			WebkitMaskRepeat: "no-repeat",
			maskPosition: "center",
			WebkitMaskPosition: "center",
		})

		// Hover animation - animate mask position to create rotation effect
		const handleMouseEnter = () => {
			// Animate the mask position to simulate rotation
			gsap.to(maskElement, {
				rotation: animationConfig.rotation,
				duration: animationConfig.duration,
				ease: animationConfig.ease,
				transformOrigin: "center center",
				// Counter-rotate the avatar content to keep it stationary
				onUpdate: function () {
					const avatar = maskElement.querySelector(".avatar-content")
					if (avatar) {
						gsap.set(avatar, {
							rotation: -this.progress() * animationConfig.rotation,
							transformOrigin: "center center",
						})
					}
				},
			})
			gsap.to(buttonElement, {
				scale: 1.05,
				duration: 0.3,
				ease: "elastic.inOut",
			})
		}

		const handleMouseLeave = () => {
			gsap.to(maskElement, {
				rotation: 0,
				duration: animationConfig.duration * 0.7,
				ease: "power2.out",
				onUpdate: function () {
					const avatar = maskElement.querySelector(".avatar-content")
					if (avatar) {
						gsap.set(avatar, {
							rotation: -this.progress() * animationConfig.rotation,
							transformOrigin: "center center",
						})
					}
				},
				onComplete: function () {
					// Ensure avatar is back to 0 rotation
					const avatar = maskElement.querySelector(".avatar-content")
					if (avatar) {
						gsap.set(avatar, { rotation: 0 })
					}
				},
			})
			gsap.to(buttonElement, {
				scale: 1,
				duration: 0.3,
				ease: "power2.out",
			})
		}

		// Add event listeners
		buttonElement.addEventListener("mouseenter", handleMouseEnter)
		buttonElement.addEventListener("mouseleave", handleMouseLeave)

		// Cleanup
		return () => {
			gsap.killTweensOf([maskElement, buttonElement])
			buttonElement.removeEventListener("mouseenter", handleMouseEnter)
			buttonElement.removeEventListener("mouseleave", handleMouseLeave)
		}
	}, [selectedShape, animationStyle])

	const handleCopyWithFeedback = async (
		copyFn: () => Promise<void>,
		field: string
	) => {
		await copyFn()
		setCopiedField(field)
		setTimeout(() => setCopiedField(null), 2000)
	}

	// Loading state - M3 expressive loading with mask
	if (isLoading) {
		return (
			<div
				className={`${sizeClasses[size]} bg-surface-container-high animate-pulse shadow-sm ring-1 ring-outline-variant/20 ${className}`}
				style={{
					maskImage: `url(/shapes/${selectedShape})`,
					WebkitMaskImage: `url(/shapes/${selectedShape})`,
					maskSize: "cover",
					WebkitMaskSize: "cover",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					maskPosition: "center",
					WebkitMaskPosition: "center",
				}}
			/>
		)
	}

	// Not authenticated - M3 expressive sign in button with mask
	if (!isAuthenticated) {
		return (
			<Button
				ref={buttonRef}
				variant="default"
				size={size === "sm" ? "sm" : "default"}
				onClick={handleSignIn}
				disabled={isSigningIn}
				className={`
					gap-3 px-6 py-3 h-auto min-h-[48px]
					bg-primary-container hover:bg-primary-container/90
					text-on-primary-container
					shadow-sm hover:shadow-md
					transition-all duration-300 ease-out
					border border-outline-variant/20
					${className}
				`}
				style={{
					maskImage: `url(/shapes/${selectedShape})`,
					WebkitMaskImage: `url(/shapes/${selectedShape})`,
					maskSize: "cover",
					WebkitMaskSize: "cover",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					maskPosition: "center",
					WebkitMaskPosition: "center",
				}}
			>
				{isSigningIn ? (
					<Clock className="h-5 w-5 animate-spin" />
				) : (
					<LogIn className="h-5 w-5" />
				)}
				{size !== "sm" && (
					<span className="font-medium">
						{isSigningIn ? "Signing in..." : "Sign In"}
					</span>
				)}
			</Button>
		)
	}

	// Authenticated - M3 expressive profile dropdown with GSAP mask
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					ref={buttonRef}
					variant="ghost"
					className={`
						${sizeClasses[size]} p-0 relative
						bg-transparent
						${className}
					`}
				>
					<div
						ref={maskRef}
						className={`${sizeClasses[size]} relative overflow-hidden`}
					>
						<Avatar
							className={`${sizeClasses[size]} w-full h-full avatar-content`}
						>
							<AvatarImage
								src={user?.image || ""}
								alt={user?.name || ""}
								className="object-cover w-full h-full"
							/>
							<AvatarFallback className="bg-tertiary-container text-on-tertiary-container font-semibold text-lg w-full h-full flex items-center justify-center">
								{user?.initials || "U"}
							</AvatarFallback>
						</Avatar>
					</div>

					{/* ...existing status indicators... */}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="
					w-80 p-0
					bg-surface-container-high
					rounded-[28px] shadow-lg
					border border-outline-variant/20
					backdrop-blur-sm
				"
				align="end"
				sideOffset={12}
			>
				<DropdownMenuLabel className="font-normal p-6 pb-4">
					<div className="flex flex-col space-y-4">
						{/* M3 expressive user info header */}
						<div className="flex items-center space-x-4">
							<div className="relative">
								<div
									className="h-16 w-16 ring-2 ring-outline-variant/20"
									style={{
										maskImage: `url(/shapes/${selectedShape})`,
										WebkitMaskImage: `url(/shapes/${selectedShape})`,
										maskSize: "cover",
										WebkitMaskSize: "cover",
										maskRepeat: "no-repeat",
										WebkitMaskRepeat: "no-repeat",
										maskPosition: "center",
										WebkitMaskPosition: "center",
									}}
								>
									<Avatar className="max-h-16 max-w-16 w-full h-full">
										<AvatarImage
											src={user?.image || ""}
											alt={user?.name || ""}
											className="w-full h-full object-cover"
										/>
										<AvatarFallback className="bg-tertiary-container text-on-tertiary-container font-semibold text-xl w-full h-full flex items-center justify-center">
											{user?.initials || "U"}
										</AvatarFallback>
									</Avatar>
								</div>
								{userStatus.isVerified && (
									<div className="absolute -bottom-1 -right-1 h-6 w-6 bg-tertiary rounded-full shadow-md ring-2 ring-surface-container-high flex items-center justify-center">
										<Shield className="h-3.5 w-3.5 text-on-tertiary" />
									</div>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<p className="text-base font-semibold text-on-surface truncate">
										{user?.name || "Anonymous User"}
									</p>
								</div>
								<p className="text-sm text-on-surface-variant truncate">
									{user?.email}
								</p>
							</div>
						</div>

						{/* M3 expressive status badges */}
						<div className="flex gap-2 flex-wrap">
							{userStatus.isNewUser && (
								<Badge
									variant="secondary"
									className="
										text-xs px-3 py-1.5 rounded-[16px]
										bg-secondary-container text-on-secondary-container
										border-0 font-medium
									"
								>
									<Sparkles className="h-3 w-3 mr-1.5" />
									New User
								</Badge>
							)}
							{userStatus.isVerified && (
								<Badge
									variant="default"
									className="
										text-xs px-3 py-1.5 rounded-[16px]
										bg-tertiary-container text-on-tertiary-container
										border-0 font-medium
									"
								>
									<Shield className="h-3 w-3 mr-1.5" />
									Verified
								</Badge>
							)}
						</div>

						{/* M3 expressive copy actions */}
						<div className="space-y-3 pt-2">
							<div className="flex items-center justify-between p-3 rounded-[16px] bg-surface-container-low">
								<div className="flex flex-col">
									<span className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
										Name
									</span>
									<span className="text-sm text-on-surface font-medium truncate">
										{user?.name}
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="
										h-10 w-10 p-0 rounded-[12px]
										hover:bg-primary-container hover:text-on-primary-container
										transition-all duration-200
									"
									onClick={() => handleCopyWithFeedback(copyName, "name")}
								>
									{copiedField === "name" ? (
										<Check className="h-4 w-4 text-tertiary" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</div>
							<div className="flex items-center justify-between p-3 rounded-[16px] bg-surface-container-low">
								<div className="flex flex-col">
									<span className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
										Email
									</span>
									<span className="text-sm text-on-surface font-medium truncate">
										{user?.email}
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="
										h-10 w-10 p-0 rounded-[12px]
										hover:bg-primary-container hover:text-on-primary-container
										transition-all duration-200
									"
									onClick={() => handleCopyWithFeedback(copyEmail, "email")}
								>
									{copiedField === "email" ? (
										<Check className="h-4 w-4 text-tertiary" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</div>
						</div>
					</div>
				</DropdownMenuLabel>

				<div className="px-2 pb-2">
					<div className="h-px bg-outline-variant/20 mx-4 mb-2" />

					<DropdownMenuItem
						onClick={handleSettings}
						className="
							mx-2 mb-1 p-4 text-lg rounded-[20px] cursor-pointer
							hover:bg-secondary-container hover:text-on-secondary-container
							focus:bg-secondary-container focus:text-on-secondary-container
							transition-all duration-200
						"
					>
						<Settings className="mr-4  size-6" />
						<span className="font-medium">Settings</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={handleManageAccount}
						className="
							mx-2 mb-3 p-4 rounded-[20px] text-lg cursor-pointer
							hover:bg-secondary-container hover:text-on-secondary-container
							focus:bg-secondary-container focus:text-on-secondary-container
							transition-all duration-200
						"
					>
						<User className="mr-4 h-6 w-6" />
						<span className="font-medium">Manage Account</span>
					</DropdownMenuItem>

					<div className="h-px bg-outline-variant/20 mx-4 mb-2" />

					<DropdownMenuItem
						onClick={handleSignOut}
						disabled={isSigningOut}
						className="
							mx-2 mb-2 p-4 text-lg rounded-[20px] cursor-pointer
							hover:bg-error-container hover:text-on-error-container
							focus:bg-error-container focus:text-on-error-container
							disabled:opacity-50 disabled:cursor-not-allowed
							transition-all duration-200
						"
					>
						{isSigningOut ? (
							<Clock className="mr-4 h-6 w-6 animate-spin" />
						) : (
							<LogOut className="mr-4 h-6 w-6" />
						)}
						<span className="font-medium">
							{isSigningOut ? "Signing out..." : "Sign Out"}
						</span>
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
