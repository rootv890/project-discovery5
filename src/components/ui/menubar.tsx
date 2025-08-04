"use client"

import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a styled menubar container using Radix UI primitives.
 *
 * Applies base layout, background, border, and shadow styles. Additional class names and props are forwarded to the underlying menubar root element.
 */
function Menubar({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn(
				"bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Provides a wrapper for a menubar menu, forwarding all props and adding a data attribute for slot identification.
 */
function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return (
		<MenubarPrimitive.Menu
			data-slot="menubar-menu"
			{...props}
		/>
	)
}

/**
 * Renders a group of related menubar items for organizational purposes.
 *
 * Passes all props to the underlying Radix UI menubar group primitive and adds a data attribute for slot identification.
 */
function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return (
		<MenubarPrimitive.Group
			data-slot="menubar-group"
			{...props}
		/>
	)
}

/**
 * Renders a portal for menubar content, enabling menu elements to be rendered outside the DOM hierarchy of their parent.
 */
function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return (
		<MenubarPrimitive.Portal
			data-slot="menubar-portal"
			{...props}
		/>
	)
}

/**
 * Renders a group of radio items within a menubar, allowing a single selection.
 *
 * Forwards all props to the underlying Radix UI RadioGroup primitive and adds a data attribute for styling or identification.
 */
function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup
			data-slot="menubar-radio-group"
			{...props}
		/>
	)
}

/**
 * Renders a styled menubar trigger button that opens or closes a menu when activated.
 *
 * Applies custom styles for focus and open states, and forwards all additional props to the underlying trigger primitive.
 */
function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
	return (
		<MenubarPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders the menubar dropdown content with custom alignment, offset, and styling.
 *
 * Wraps the Radix UI menubar content in a portal and applies default and custom class names for appearance and animation. Supports alignment and offset customization.
 *
 * @param align - Horizontal alignment of the content relative to the trigger. Defaults to "start".
 * @param alignOffset - Offset for alignment positioning. Defaults to -4.
 * @param sideOffset - Offset for side positioning. Defaults to 8.
 */
function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
					className
				)}
				{...props}
			/>
		</MenubarPortal>
	)
}

/**
 * Renders a styled menubar item with optional destructive variant and inset padding.
 *
 * Supports focus, disabled, and destructive states, and allows custom class names and additional props.
 *
 * @param inset - If true, applies additional left padding for visual alignment
 * @param variant - Visual style of the item; "default" or "destructive"
 */
function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean
	variant?: "default" | "destructive"
}) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a styled menubar checkbox item with an optional check icon indicator.
 *
 * Displays a selectable item within a menubar that can be checked or unchecked, showing a checkmark icon when selected. Supports disabled state and custom content.
 *
 * @param checked - Whether the checkbox item is checked
 * @param children - The content to display inside the checkbox item
 * @returns The rendered menubar checkbox item component
 */
function MenubarCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	)
}

/**
 * Renders a styled menubar radio item with an indicator icon when selected.
 *
 * Displays its children as the label and shows a circle icon on selection. Applies focus, disabled, and layout styles for consistent appearance within a menubar.
 */
function MenubarRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<CircleIcon className="size-2 fill-current" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	)
}

/**
 * Renders a styled menubar label, optionally indented for submenu grouping.
 *
 * @param inset - If true, applies additional left padding for visual hierarchy
 */
function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a styled separator line within a menubar for visual grouping of menu items.
 *
 * Accepts additional class names and props for customization.
 */
function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cn("bg-border -mx-1 my-1 h-px", className)}
			{...props}
		/>
	)
}

/**
 * Renders a styled keyboard shortcut hint within a menubar item.
 *
 * Displays its children as shortcut text, typically aligned to the right of the menu item.
 */
function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a submenu container within the menubar, enabling nested menu structures.
 */
function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return (
		<MenubarPrimitive.Sub
			data-slot="menubar-sub"
			{...props}
		/>
	)
}

/**
 * Renders a styled menubar sub-trigger that opens a submenu, displaying its children and a right-pointing chevron icon.
 *
 * @param inset - If true, applies additional left padding for visual alignment.
 */
function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto h-4 w-4" />
		</MenubarPrimitive.SubTrigger>
	)
}

/**
 * Renders the submenu content for a menubar, applying custom styles and transition animations.
 *
 * Accepts all props supported by the underlying Radix UI `SubContent` primitive.
 */
function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			className={cn(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
				className
			)}
			{...props}
		/>
	)
}

export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
}
