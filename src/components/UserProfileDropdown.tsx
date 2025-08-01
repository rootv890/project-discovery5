"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Copy } from "iconsax-reactjs"
import { Loader2, LogOut, Mail, Settings, Shield, User } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "./ui/button"

interface UserProfileDropdownProps {
	user: {
		id: string
		name: string | null
		email: string
		image?: string | null
		emailVerified?: boolean
	}
	userInitials: string
	isSigningOut: boolean
	onSignOut: () => void
	onManageAccount: () => void
	onSettings: () => void
	size?: "sm" | "md" | "lg"
	align?: "start" | "center" | "end"
	side?: "top" | "right" | "bottom" | "left"
}

export function UserProfileDropdown({
	user,
	userInitials,
	isSigningOut,
	onSignOut,
	onManageAccount,
	onSettings,
	size = "md",
	align = "end",
	side = "bottom",
}: UserProfileDropdownProps) {
	const sizeClasses = {
		sm: "size-8",
		md: "size-10",
		lg: "size-12",
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"relative flex shrink-0 overflow-hidden rounded-full border border-border/50 transition-all duration-200 hover:border-border hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
						sizeClasses[size]
					)}
					aria-label="User menu"
				>
					<Avatar className="size-full">
						<AvatarImage
							src={user.image || undefined}
							alt={user.name || "User"}
							className="object-cover"
						/>
						<AvatarFallback className="bg-primary text-on-primary text-sm font-medium">
							{userInitials}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-64 p-2"
				align={align}
				side={side}
				sideOffset={8}
			>
				{/* User Info Header */}
				<DropdownMenuLabel className="p-3 bg-muted/50 rounded-lg mb-2">
					<div className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarImage
								src={user.image || undefined}
								alt={user.name || "User"}
							/>
							<AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
								{userInitials}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<div className="font-medium text-sm truncate">
								{user.name || "Anonymous User"}
							</div>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<span className="truncate text-xs">{user.email}</span>
								<Button
									variant={"ghost"}
									size={"xs"}
									onClick={() => {
										navigator.clipboard.writeText(user.email)
										toast.success("Email copied to clipboard", {
											style: {
												zIndex: 1000,
											},
										})
									}}
								>
									<Copy />
								</Button>
							</div>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* Menu Items */}
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={onManageAccount}
						className="cursor-pointer p-3 rounded-lg"
					>
						<User className="mr-3 size-4" />
						<span>Manage Account</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={onSettings}
						className="cursor-pointer p-3 rounded-lg"
					>
						<Settings className="mr-3 size-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* Sign Out */}
				<DropdownMenuItem
					onClick={onSignOut}
					disabled={isSigningOut}
					className="cursor-pointer p-3 rounded-lg text-destructive focus:text-destructive"
				>
					{isSigningOut ? (
						<Loader2 className="mr-3 size-4 animate-spin" />
					) : (
						<LogOut className="mr-3 size-4" />
					)}
					<span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
