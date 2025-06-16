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
	}
}
