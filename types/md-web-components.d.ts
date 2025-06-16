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
	}
}
