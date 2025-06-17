declare namespace JSX {
	interface IntrinsicElements {
		"md-linear-progress": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		> & {
			indeterminate?: boolean
			progress?: number
			buffer?: number
			reverse?: boolean
			fourColor?: boolean
		}

		"md-circular-progress": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		> & {
			indeterminate?: boolean
			progress?: number
			buffer?: number
			fourColor?: boolean
		}

		// Slider
		"md-slider": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		> & {
			value?: number
			min?: number
			max?: number
			step?: number
			disabled?: boolean
			labeled?: boolean
			ticks?: boolean
			tickInterval?: number
			valueLabel?: string
		}

		// swiwtch
		"md-switch": React.DetailedHTMLProps<HTMLElement> & {
			icons?: boolean
			selected?: boolean
			disabled?: boolean
			showOnlySelectedIcon?: boolean
			required?: boolean
			value?: string // 'on' or 'off'
			// methods
			formReset?: () => void
			formStateReset?: (state: boolean) => void
			name?: string
			// events
			// onChange?: (event: CustomEvent) => void
			// onInput?: (event: CustomEvent) => void
		}
	}
}
