import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
	size?: "sm" | "md" | "lg"
}

const sizeMap = {
	sm: { h: "h-[40px]", p: "py-[0.5rem] px-[0.75rem]" },
	md: { h: "h-[48px]", p: "py-[0.625rem] px-[1rem]" },
	lg: { h: "h-[56px]", p: "py-[0.75rem] px-[1.25rem]" },
}

function Input({ className, size, ...props }: InputProps) {
	const { h, p } = sizeMap[size ?? "md"]

	return (
		<input
			{...props}
			className={cn(
				"w-full min-w-0 flex outline-none transition-[color,box-shadow]",
				"bg-surface-container-high text-on-surface-variant border border-surface-container-low rounded-lg text-base font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
				"placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				h,
				p,
				className
			)}
		/>
	)
}

export { Input }
