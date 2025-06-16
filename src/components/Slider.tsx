"use client"

import React from "react"
import "@material/web/slider/slider.js"

type MdSliderProps = React.HTMLAttributes<HTMLElement> & {
	value?: number
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	labeled?: boolean
	ticks?: boolean
	tickInterval?: number
	valueLabel?: string
	height?: string
	onInput?: (e: Event) => void // Native input event
}

const Slider2 = (props: MdSliderProps) => {
	return (
		// @ts-ignore: md-slider is a custom element
		<md-slider
			style={{
				"--md-slider-active-track-height": props.height || "6px",
				"--md-slider-inactive-track-height": props.height || "6px",
			}}
			{...props}
		/>
	)
}

export default Slider2
