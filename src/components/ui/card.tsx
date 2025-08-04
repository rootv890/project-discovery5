import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import * as React from "react"

type CardProps = React.ComponentProps<"div"> & {
	variant?: "elevated" | "filled" | "outlined"
}

const cardVariants = cva(
	"flex flex-col gap-6 overflow-hidden rounded-[12px] border text-on-surface-variant",
	{
		variants: {
			variant: {
				elevated: "shadow-md bg-surface-container-low",
				filled: "bg-surface-container-high",
				outlined: "border-outline-variant border-2 bg-surface",
			},
		},
		defaultVariants: {
			variant: "filled",
		},
	}
)

function Card({ className, variant = "filled", ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			data-variant={variant}
			className={cn(cardVariants({ variant }), className)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[data-slot=card-action]:grid-cols-[1fr_auto]",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders the title section of a Card with appropriate text styling.
 *
 * Additional class names and props are merged and applied to the underlying div.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-var(--ts-body-sm)  font-medium text-on-surface",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders descriptive text within a Card component, styled for secondary content.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-body-md   text-on-surface-variant", className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 py-4 mt-auto", className)}
			{...props}
		/>
	)
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
}
