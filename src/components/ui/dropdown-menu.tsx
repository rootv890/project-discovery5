"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Provides the root container for a dropdown menu, enabling menu state management and context for nested dropdown components.
 */
function DropdownMenu({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	return (
		<DropdownMenuPrimitive.Root
			data-slot="dropdown-menu"
			{...props}
		/>
	)
}

/**
 * Renders a portal container for dropdown menu content, enabling the menu to be rendered outside the DOM hierarchy of its trigger.
 */
function DropdownMenuPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return (
		<DropdownMenuPrimitive.Portal
			data-slot="dropdown-menu-portal"
			{...props}
		/>
	)
}

/**
 * Renders the trigger element that toggles the dropdown menu.
 *
 * Forwards all props to the underlying trigger primitive and adds a `data-slot` attribute for identification.
 */
function DropdownMenuTrigger({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	)
}

/**
 * Renders the dropdown menu content panel with custom styling and animation, positioned relative to the trigger.
 *
 * @param className - Additional class names to apply to the content panel
 * @param sideOffset - Optional offset distance from the trigger element (default: 4)
 */
function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				className={cn(
					"bg-surface-container-high text-on-surface-variant border border-surface-container-low data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md p-1 shadow-md",
					className
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
}

/**
 * Renders a group container for organizing dropdown menu items.
 */
function DropdownMenuGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot="dropdown-menu-group"
			{...props}
		/>
	)
}

/**
 * Renders a styled dropdown menu item with optional destructive styling and left inset.
 *
 * @param inset - If true, adds left padding to align with items that have icons or indicators.
 * @param variant - Sets the visual style of the item; use "destructive" for actions that remove or delete.
 */
function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean
	variant?: "default" | "destructive"
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-primary-container focus:text-on-primary-container  data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-error-container data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a styled checkbox item for use within a dropdown menu, displaying a check icon when selected.
 *
 * @param checked - Whether the checkbox item is checked
 * @returns The dropdown menu checkbox item element
 */
function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"focus:bg-surface-container-high focus:text-primary relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

/**
 * Renders a group container for radio items within a dropdown menu.
 */
function DropdownMenuRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	)
}

/**
 * Renders a styled radio item for use within a dropdown menu radio group.
 *
 * Displays a selectable radio option with an indicator icon when selected. Supports custom content and styling.
 */
function DropdownMenuRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"focus:bg-surface-container-high focus:text-primary relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<CircleIcon className="size-2 fill-current" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	)
}

/**
 * Renders a styled label for a dropdown menu section, with optional inset padding.
 *
 * @param inset - If true, applies additional left padding to visually indent the label
 */
function DropdownMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn(
				"px-2 py-1.5 text-on-surface-variant font-medium data-[inset]:pl-8",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a horizontal separator line within a dropdown menu.
 *
 * Adds spacing and a styled divider to visually separate groups of menu items.
 */
function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("bg-outline-variant -mx-1 my-1 h-px", className)}
			{...props}
		/>
	)
}

/**
 * Renders a styled span for displaying a keyboard shortcut within a dropdown menu item.
 *
 * The shortcut is aligned to the right and styled with muted text and wide letter spacing.
 */
function DropdownMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a container for a nested submenu within a dropdown menu.
 */
function DropdownMenuSub({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
	return (
		<DropdownMenuPrimitive.Sub
			data-slot="dropdown-menu-sub"
			{...props}
		/>
	)
}

/**
 * Renders a styled submenu trigger for a dropdown menu, optionally indented and displaying a right-pointing chevron icon.
 *
 * @param inset - If true, applies additional left padding to visually indent the trigger.
 */
function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus:bg-surface-container-high focus:text-primary data-[state=open]:bg-surface-container-high data-[state=open]:text-primary flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto size-4" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}

/**
 * Renders the content panel for a dropdown submenu with themed styling and animation.
 *
 * Applies custom classes for background, border, text, animation, and shadow. Additional class names can be provided via the `className` prop.
 */
function DropdownMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				"bg-surface-container-high text-on-surface-variant border border-surface-container-low data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md p-1 shadow-lg",
				className
			)}
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
}
