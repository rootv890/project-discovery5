"use client"

import { cn } from "@/lib/utils"
import "@material/web/select/select-option.js"
import React, { HTMLAttributes, ReactNode } from "react"

export type SelectOptionProps = HTMLAttributes<HTMLElement> & {
	value: string
	selected?: boolean
	disabled?: boolean
	displayText?: string
	start?: ReactNode
	end?: ReactNode
	headline?: ReactNode
	supportingText?: ReactNode
}

export function SelectOption({
	value,
	selected,
	disabled,
	displayText,
	start,
	end,
	headline,
	supportingText,
	className,
	...props
}: SelectOptionProps) {
	return (
		// @ts-expect-error: Custom Web component
		<md-select-option
			value={value}
			selected={selected ?? false}
			disabled={disabled ?? false}
			display-text={displayText}
			class={cn("d5-option", className)}
			{...props}
			suppressHydrationWarning={true}
		>
			{start && <span slot="start">{start}</span>}
			{headline && <span slot="headline">{headline}</span>}
			{supportingText && <span slot="supporting-text">{supportingText}</span>}
			{end && <span slot="end">{end}</span>}
			{/* @ts-expect-error: Custom Web component */}
		</md-select-option>
	)
}
