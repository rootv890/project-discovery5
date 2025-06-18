"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import "@material/web/select/outlined-select.js"
import { cn } from "@/lib/utils"
import { SelectOption, SelectOptionProps } from "./SelectOption"

export type SelectProps = React.HTMLAttributes<HTMLElement> & {
	variant?: "outlined" | "filled" // only visually different, we always use outlined
	options?: SelectOptionProps[]
	value?: string
	name?: string
	label?: string
	errorText?: string
	supportingText?: string
	noAsterisk?: boolean
	error?: boolean
	menuPositioning?: "absolute" | "fixed" | "popover"
	clampMenuWidth?: boolean
	disabled?: boolean
	menuAlign?: "start" | "end"
	quick?: boolean
	displayText?: string
	className?: string
}

export type SelectHandle = {
	select?: (value: string) => void
	selectIndex?: (index: number) => void
	reset?: () => void
}

export const Select = forwardRef<SelectHandle, SelectProps>(
	({ variant = "outlined", options = [], value, className, ...rest }, ref) => {
		const localRef = useRef<HTMLElement>(null)

		useImperativeHandle(ref, () => localRef.current as unknown as SelectHandle)

		const variantClass = variant === "filled" ? "d5-select--filled" : ""

		return (
			// @ts-expect-error: Web component
			<md-outlined-select
				ref={localRef}
				class={cn("d5-select", variantClass, className)}
				value={value}
				{...rest}
				suppressHydrationWarning={true}
			>
				{options.map((opt, i) => (
					<SelectOption
						key={opt.value ?? i}
						value={opt.value}
						selected={opt.value === value}
						disabled={opt.disabled}
						displayText={opt.displayText}
						headline={opt.headline}
						supportingText={opt.supportingText}
						start={opt.start}
						end={opt.end}
					/>
				))}
				{/* @ts-expect-error: Custom Web component */}
			</md-outlined-select>
		)
	}
)

Select.displayName = "Select"
