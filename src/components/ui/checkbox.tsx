"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const checkboxVariants = cva(
	`
  peer border-input dark:bg-input/30 data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-[18px] shrink-0 rounded-[3px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50
  `,
	{
		variants: {
			variant: {
				primary:
					"bg-primary text-on-primary  data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary",
				destructive:
					"bg-error text-on-error data-[state=checked]:bg-error data-[state=checked]:text-error-foreground dark:data-[state=checked]:bg-error data-[state=checked]:border-error",
				neutral:
					"bg-surface-variant text-on-surface-variant data-[state=checked]:bg-surface-variant data-[state=checked]:text-on-surface-variant",
			},
			state: {
				checked: "bg-primary text-on-primary",
				unchecked: "bg-surface-variant text-on-primary",
			},
			disabled: {
				true: "opacity-50 cursor-not-allowed",
			},
		},
		defaultVariants: {
			variant: "primary",
			state: "unchecked",
		},
	}
)

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
	variant?: "primary" | "destructive" | "neutral"
	disabled?: boolean
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
	className,
	variant = "primary",
	disabled = false,
	checked,
	onCheckedChange,
	...props
}: CheckboxProps) {
	const state = checked ? "checked" : "unchecked"

	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ variant, state, disabled }), className)}
			checked={checked}
			onCheckedChange={onCheckedChange}
			disabled={disabled}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<Check className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
