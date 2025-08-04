"use client"

import React from "react"
import "@material/web/switch/switch.js"

export type SwitchEvent = Event & {
	target: EventTarget & { selected: boolean }
}

type SwitchProps = React.HTMLAttributes<HTMLElement> & {
	icons?: boolean
	selected?: boolean
	disabled?: boolean
	showOnlySelectedIcon?: boolean
	required?: boolean
	value?: string // "on" or "off"
	isDestructive?: boolean
	onChange?: (e: SwitchEvent) => void
}

const Switch = ({
	icons = false,
	selected = false,
	disabled = false,
	showOnlySelectedIcon = false,
	required = false,
	value = "off",
	isDestructive = false,
	onChange,
	...props
}: SwitchProps) => {
	const destructiveStyles = isDestructive
		? {
				"--md-switch-selected-handle-color": "var(--color-error)",
				"--md-switch-selected-track-color": "var(--color-error-container)",
				"--md-switch-selected-icon-color": "var(--color-on-error-container)",
				"--md-switch-handle-color": "var(--color-outline)",
				"--md-switch-track-color": "var(--color-surface-container-highest)",
				"--md-switch-selected-focus-handle-color": "var(--color-error)",
				"--md-switch-selected-focus-track-color":
					"var(--color-error-container)",
				"--md-switch-focus-handle-color": "var(--color-outline)",
				"--md-switch-focus-track-color":
					"var(--color-surface-container-highest)",
				"--md-switch-selected-hover-handle-color": "var(--color-error)",
				"--md-switch-selected-hover-track-color":
					"var(--color-error-container)",
				"--md-switch-hover-handle-color": "var(--color-outline)",
				"--md-switch-hover-track-color":
					"var(--color-surface-container-highest)",
				"--md-switch-selected-hover-state-layer-color": "var(--color-error)",
				"--md-switch-hover-state-layer-color": "var(--color-on-surface)",
				"--md-switch-selected-pressed-handle-color": "var(--color-error)",
				"--md-switch-selected-pressed-track-color":
					"var(--color-error-container)",
				"--md-switch-pressed-handle-color": "var(--color-outline)",
				"--md-switch-pressed-track-color":
					"var(--color-surface-container-highest)",
				"--md-switch-selected-pressed-state-layer-color": "var(--color-error)",
				"--md-switch-pressed-state-layer-color": "var(--color-on-surface)",
		  }
		: {}

	return (
		// @ts-expect-error: Custom Web component
		<md-switch
			icons={icons}
			selected={selected}
			disabled={disabled}
			showOnlySelectedIcon={showOnlySelectedIcon}
			required={required}
			value={value}
			style={destructiveStyles as React.CSSProperties}
			onChange={(e: SwitchEvent) => {
				onChange?.(e)
			}}
			{...props}
		/>
	)
}

export default Switch
