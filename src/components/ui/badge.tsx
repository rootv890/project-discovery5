import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-primary-container/50 text-on primary-container [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

/**
 * Renders a badge element with customizable visual variants and optional element type.
 *
 * Supports different color and style variants, and can render as a native `span` or as a child component using Radix UI's Slot.
 *
 * @param variant - The visual style variant of the badge. Defaults to "default" if not specified.
 * @param asChild - If true, renders the badge as a Slot component instead of a span.
 */
function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span"

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
