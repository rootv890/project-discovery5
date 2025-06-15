"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			delayDuration={delayDuration}
			{...props}
		/>
	)
}

function Tooltip({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root {...props} />
		</TooltipProvider>
	)
}

function TooltipTrigger({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return <TooltipPrimitive.Trigger {...props} />
}

function TooltipContent({
	className,
	sideOffset = 0,
	children,
	rich = false,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
	rich?: boolean
}) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-fit max-w-72 origin-[--radix-tooltip-content-transform-origin] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-2 text-sm shadow-md",
					rich
						? "bg-surface-container text-on-surface body-md rounded-lg px-4 py-3"
						: "bg-inverse-surface text-inverse-on-surface",
					className
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow
					className={cn(
						"z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
						rich
							? "fill-surface-container bg-surface-container"
							: "fill-inverse-surface bg-inverse-surface"
					)}
				/>
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	)
}

function TooltipTitle({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("title-md !font-medium mb-2", className)}
			{...props}
		>
			{children}
		</div>
	)
}

function TooltipDescription({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"text-sm text-[--on-surface-variant] leading-tight",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

function TooltipFooter({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mt-2 text-xs text-[--on-surface-variant]/70", className)}
			{...props}
		>
			{children}
		</div>
	)
}

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipTitle,
	TooltipDescription,
	TooltipFooter,
	TooltipProvider,
}
