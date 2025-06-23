import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const radiusBySize: Record<string, string> = {
	xs: "rounded-[0.75rem]",
	sm: "rounded-[0.75rem]",
	md: "rounded-[1rem]",
	lg: "rounded-[1.75rem]",
	xl: "rounded-[1.75rem]",
}

const buttonVariants = cva(
	`inline-flex items-center justify-center whitespace-nowrap
    font-medium transition-all disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
    outline-none focus-visible:ring-3 focus-visible:ring-primary/50
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 cursor-pointer active:scale-98 transition-all duration-100`,
	{
		variants: {
			variant: {
				filled:
					"bg-primary  text-on-primary shadow-xs hover:bg-primary/80 active:bg-primary/90",
				inverted:
					"bg-inverse-surface text-inverse-on-surface shadow-xs hover:bg-inverse-surface/80 active:bg-inverse-surface/90",
				tonal:
					"bg-secondary-container text-on-secondary-container shadow-xs hover:bg-secondary-container/80 active:bg-secondary-container/90",
				outline:
					"border border-outline text-on-surface-variant bg-transparent hover:bg-surface-bright",
				destructive:
					"bg-tertiary-container text-on-tertiary-container shadow-xs hover:bg-tertiary-container/80",
				ghost: "bg-transparent text-on-surface hover:bg-surface-variant",
				link: "bg-transparent text-primary underline-offset-4 hover:underline",
			},
			size: {
				xs: "h-[32px] py-[0.375rem] px-[0.75rem] label-lg gap-1",
				sm: "h-[48px] py-[0.625rem] px-[1rem]   text-sm gap-2",
				md: "h-[56px] py-[1rem]     px-[1.5rem] text-base gap-2",
				lg: "h-[96px] py-[2rem]     px-[3rem]   text-lg gap-3",
				xl: "h-[136px] py-[3rem]    px-[4rem]   text-xl gap-4",
			},
			borderType: {
				round: "rounded-full",
				square: "", // dynamic per size
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "md",
			borderType: "round",
		},
	}
)

type ButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, borderType, asChild = false, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				ref={ref}
				className={cn(
					buttonVariants({ variant, size, borderType, className }),
					radiusBySize[borderType === "round" ? "round" : size ?? "md"]
				)}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
