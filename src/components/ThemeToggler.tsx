"use client"

import * as React from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function ThemeToggler() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="focus:bg-surface-container hover:bg-surface-container "
				>
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className={cn(
						"flex justify-between w-full",
						theme === "light" && "bg-primary-container"
					)}
					onClick={() => setTheme("light")}
				>
					Light <Sun />
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(
						"flex justify-between w-full",
						theme === "dark" && "bg-primary-container"
					)}
					onClick={() => setTheme("dark")}
				>
					Dark <Moon />
				</DropdownMenuItem>
				<DropdownMenuItem
					className={cn(
						"flex justify-between w-full",
						theme === "system" && "bg-primary-container"
					)}
					onClick={() => setTheme("system")}
				>
					System <Laptop />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
