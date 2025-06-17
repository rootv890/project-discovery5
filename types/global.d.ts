import "react"

// A generic helper type for Material Web components to reduce repetition.
// It combines custom props with standard React HTML attributes.
type MaterialWebComponent<
	Props,
	Ref extends HTMLElement
> = React.DetailedHTMLProps<React.HTMLAttributes<Ref>, Ref> & Props

// --- Component Prop Definitions ---

// Props for md-linear-progress and md-circular-progress
type MdProgressProps = {
	indeterminate?: boolean
	progress?: number
	buffer?: number
	fourColor?: boolean
	// Linear progress specific
	reverse?: boolean
}

// Props for md-slider
type MdSliderProps = {
	value?: number
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	labeled?: boolean
	ticks?: boolean
	valueLabel?: string
}

// Props for md-switch
type MdSwitchProps = {
	icons?: boolean
	selected?: boolean
	disabled?: boolean
	showOnlySelectedIcon?: boolean
	required?: boolean
	value?: string // 'on' or 'off'
	name?: string
}

// Props for md-outlined-text-field and md-filled-text-field
type MdTextFieldProps = {
	variant?: "filled" | "outlined"
	type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search"
	label?: string
	error?: boolean
	errorText?: string
	supportingText?: string
	required?: boolean
	value?: string
	prefixText?: string
	suffixText?: string
	hasTrailingIcon?: boolean
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
}

// --- Module Augmentation for JSX ---

declare module "react" {
	interface IntrinsicElements {
		// Progress Indicators
		"md-linear-progress": MaterialWebComponent<MdProgressProps, HTMLElement>
		"md-circular-progress": MaterialWebComponent<MdProgressProps, HTMLElement>

		// Slider
		"md-slider": MaterialWebComponent<
			MdSliderProps,
			HTMLElement & { valueLabel?: string }
		>

		// Switch
		"md-switch": MaterialWebComponent<
			MdSwitchProps,
			HTMLElement & {
				// Include methods on the element type if you need to call them via a ref
				formReset?: () => void
				formStateReset?: (state: boolean) => void
			}
		>

		// Text Fields
		"md-outlined-text-field": MaterialWebComponent<
			MdTextFieldProps,
			HTMLElement & {
				// Include methods on the element type
				select?: () => void
				setSelectionRange?: (
					start: number,
					end: number,
					direction?: "forward" | "backward" | "none"
				) => void
				// ... add other specific methods if needed
			}
		>
		"md-filled-text-field": MaterialWebComponent<
			MdTextFieldProps,
			HTMLElement & {
				// Include methods on the element type
				select?: () => void
				setSelectionRange?: (
					start: number,
					end: number,
					direction?: "forward" | "backward" | "none"
				) => void
				// ... add other specific methods if needed
			}
		>
		"md-filled-select": MaterialWebComponent
		"md-outlined-select": MaterialWebComponent
	}
}

export {}
