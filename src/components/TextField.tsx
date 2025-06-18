import { forwardRef, useRef, useImperativeHandle, HTMLAttributes } from "react"
import "@material/web/textfield/outlined-text-field.js"
import "@material/web/textfield/filled-text-field.js"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

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
	({ variant = "filled", className, ...props }, ref) => {
		const localRef = useRef<HTMLElement>(null)

		// Expose the real DOM ref via forwardRef
		useImperativeHandle(ref, () => localRef.current as HTMLElement)

		// Pick correct web component tag
		const Tag =
			variant === "outlined" ? "md-outlined-text-field" : "md-filled-text-field"

		const allProps = Object.fromEntries(
			Object.entries({
				...props,
				class: cn(textFieldVariants({ variant }), className),
				ref: localRef,
			}).filter(([, value]) => value !== "" && value !== undefined)
		)

		return (
			// @ts-expect-error: Custom Web component
			<Tag
				{...allProps}
				suppressHydrationWarning={true}
			/>
		)
	}
)

TextField.displayName = "TextField"
export default TextField
