"use client"

import { forwardRef, useRef, useImperativeHandle, HTMLAttributes } from "react"
import "@material/web/textfield/outlined-text-field.js"
import "@material/web/textfield/filled-text-field.js"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Web component methods supported by Material TextField
type TextFieldMethods = {
	select?: () => void
	setSelectionRange?: (
		start: number,
		end: number,
		direction?: "forward" | "backward" | "none"
	) => void
	setRangeText?: (
		replacement: string,
		start?: number,
		end?: number,
		selectionMode?: "select" | "start" | "end" | "preserve"
	) => void
	stepDown?: (stepDecrement?: number) => void
	stepUp?: (stepIncrement?: number) => void
	formResetCallback?: () => void
	formStateRestoreCallback?: (
		state: unknown,
		mode: "automatic" | "manual"
	) => void
}

// Standard input events you may want to handle
type TextFieldEvents = {
	onInput?: (e: InputEvent) => void
	onChange?: (e: Event) => void
	onFocus?: (e: FocusEvent) => void
	onBlur?: (e: FocusEvent) => void
	onClick?: (e: MouseEvent) => void
	onSelect?: (e: Event) => void
	onKeyDown?: (e: KeyboardEvent) => void
	onKeyUp?: (e: KeyboardEvent) => void
	onPointerDown?: (e: PointerEvent) => void
	onPointerUp?: (e: PointerEvent) => void
	onCompositionStart?: (e: CompositionEvent) => void
	onCompositionUpdate?: (e: CompositionEvent) => void
	onCompositionEnd?: (e: CompositionEvent) => void
}

// Props from Material + React + methods + events
export type TextFieldProps = {
	variant?: "filled" | "outlined"
	type?:
		| "text"
		| "password"
		| "email"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "textarea"
	autoComplete?: string
	inputMode?: string
	label?: string
	error?: boolean
	errorText?: string
	noAsterisk?: boolean
	required?: boolean
	value?: string
	prefixText?: string
	suffixText?: string
	hasTrailingIcon?: boolean
	supportingText?: string
	rows?: number
	cols?: number
	max?: number
	min?: number
	step?: number
	maxLength?: number
	minLength?: number
	placeholder?: string
	readOnly?: boolean
	disabled?: boolean
	name?: string
	selectionDirection?: "forward" | "backward" | "none"
	selectionStart?: number
	selectionEnd?: number
	id?: string
	className?: string
} & TextFieldMethods &
	TextFieldEvents &
	HTMLAttributes<HTMLElement>

// Optional Tailwind variant styling (adjust as needed)
const textFieldVariants = cva("w-full", {
	variants: {
		variant: {
			filled: "",
			outlined: "",
		},
	},
	defaultVariants: {
		variant: "filled",
	},
})

const TextField = forwardRef<HTMLElement, TextFieldProps>(
	({ variant = "filled", className, error, errorText, ...props }, ref) => {
		const localRef = useRef<HTMLElement>(null)

		// Expose the real DOM ref via forwardRef
		useImperativeHandle(ref, () => localRef.current as HTMLElement)

		// Pick correct web component tag
		const Tag =
			variant === "outlined" ? "md-outlined-text-field" : "md-filled-text-field"

		// Final props including class + ref
		const allProps = {
			...props,
			class: cn(textFieldVariants({ variant }), className),
			ref: localRef,
		}

		return (
			// @ts-ignore: Custom element
			<Tag
				{...allProps}
				error={error}
				errorText={errorText}
			/>
		)
	}
)

TextField.displayName = "TextField"
export default TextField
