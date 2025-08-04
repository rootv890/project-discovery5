"use client"

import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
	state: "expanded" | "collapsed"
	open: boolean
	setOpen: (open: boolean) => void
	openMobile: boolean
	setOpenMobile: (open: boolean) => void
	isMobile: boolean
	toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * Provides access to the sidebar context, including state and control functions.
 *
 * Throws an error if called outside of a `SidebarProvider`.
 * @returns The current sidebar context value.
 */
function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.")
	}

	return context
}

/**
 * Provides sidebar state and control context to descendant components.
 *
 * Manages open and collapsed states for both mobile and desktop, supports controlled and uncontrolled usage, persists state in a cookie, and enables toggling via keyboard shortcut. Wraps children with necessary providers and styling for sidebar layout.
 *
 * @param defaultOpen - Whether the sidebar is open by default (uncontrolled mode)
 * @param open - Controls the open state externally (controlled mode)
 * @param onOpenChange - Callback invoked when the open state changes (controlled mode)
 */
function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
}) {
	const isMobile = useIsMobile()
	const [openMobile, setOpenMobile] = React.useState(false)

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = React.useState(defaultOpen)
	const open = openProp ?? _open
	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value
			if (setOpenProp) {
				setOpenProp(openState)
			} else {
				_setOpen(openState)
			}

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
		},
		[setOpenProp, open]
	)

	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
	}, [isMobile, setOpen, setOpenMobile])

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault()
				toggleSidebar()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [toggleSidebar])

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed"

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
	)

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH,
							"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={cn(
						"group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
						className
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	)
}

/**
 * Renders a responsive sidebar with support for left or right positioning, multiple visual variants, and collapsible behaviors for both mobile and desktop.
 *
 * On mobile devices, displays the sidebar as a modal sheet. On desktop, supports offcanvas and icon-collapsed modes, as well as static display. The sidebar adapts its layout and transitions based on the provided `side`, `variant`, and `collapsible` props.
 *
 * @param side - Determines which side of the screen the sidebar appears on ("left" or "right").
 * @param variant - Visual style of the sidebar ("sidebar", "floating", or "inset").
 * @param collapsible - Collapsible behavior ("offcanvas", "icon", or "none").
 */
function Sidebar({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right"
	variant?: "sidebar" | "floating" | "inset"
	collapsible?: "offcanvas" | "icon" | "none"
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}

	if (isMobile) {
		return (
			<Sheet
				open={openMobile}
				onOpenChange={setOpenMobile}
				{...props}
			>
				<SheetContent
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
					side={side}
				>
					<SheetHeader className="sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className="flex h-full w-full flex-col">{children}</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<div
			className="group peer text-sidebar-foreground hidden md:block"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
				)}
			/>
			<div
				data-slot="sidebar-container"
				className={cn(
					"absolute flex-1 h-svh inset-y-0 z-10 hidden  w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
					side === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					// Adjust the padding for floating and inset variants.
					variant === "floating" || variant === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0",
					className
				)}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
				>
					{children}
				</div>
			</div>
		</div>
	)
}

/**
 * Renders a button positioned at the edge of the sidebar for toggling its open or collapsed state.
 *
 * The button adapts its position and cursor style based on the sidebar's side and collapsible mode.
 */
function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar()

	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={cn(
				"hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders the main content area adjacent to the sidebar, applying responsive margins, rounded corners, and shadows when the sidebar is in "inset" variant.
 *
 * Additional styles are applied based on sidebar state and variant using peer data attributes.
 */
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"bg-background relative flex w-full flex-1 flex-col",
				"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders an input field styled for use within the sidebar.
 *
 * Applies sidebar-specific background and sizing styles.
 */
function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn("bg-background h-8 w-full shadow-none", className)}
			{...props}
		/>
	)
}

/**
 * Renders the header section of the sidebar with vertical layout and padding.
 *
 * Accepts additional div props and custom class names for further customization.
 */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	)
}

/**
 * Container component for the sidebar footer section.
 *
 * Renders a flex column layout with padding and gap, suitable for placing footer content within the sidebar.
 */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	)
}

/**
 * Renders a styled separator line for use within the sidebar layout.
 */
function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("bg-sidebar-border mx-2 w-auto", className)}
			{...props}
		/>
	)
}

/**
 * Provides a scrollable container for the main content area of the sidebar.
 *
 * Adjusts overflow behavior when the sidebar is in icon-collapsed mode.
 */
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a container for grouping related sidebar items with consistent padding and layout.
 *
 * Applies styling and data attributes to facilitate sidebar group organization and theming.
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
			{...props}
		/>
	)
}

/**
 * Renders a label for a sidebar group, supporting optional custom rendering via the `asChild` prop.
 *
 * The label is styled for visibility within the sidebar and automatically hides or adjusts its margin when the sidebar is in icon-collapsed mode.
 *
 * @param asChild - If true, renders the label as a child component instead of a `div`.
 */
function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div"

	return (
		<Comp
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={cn(
				"text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders an action button for a sidebar group, positioned in the top-right corner of the group container.
 *
 * The button is hidden when the sidebar is in icon-collapsed mode and features an enlarged hit area on mobile devices.
 *
 * @param asChild - If true, renders the button as a child component using a Slot.
 */
function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			className={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				// Increases the hit area of the button on mobile.
				"after:absolute after:-inset-2 md:after:hidden",
				"group-data-[collapsible=icon]:hidden",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders the content area within a sidebar group, applying appropriate styling.
 */
function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("w-full text-sm", className)}
			{...props}
		/>
	)
}

/**
 * Renders a vertical list container for sidebar menu items.
 *
 * Applies layout and spacing styles suitable for grouping sidebar menu entries.
 */
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	)
}

/**
 * Renders a list item for a sidebar menu, applying appropriate styling and data attributes.
 *
 * Accepts all standard `<li>` element props.
 */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	)
}

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-sm",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

/**
 * Renders a styled sidebar menu button with support for variants, sizes, active state, and optional tooltip.
 *
 * If a tooltip is provided and the sidebar is collapsed (and not on mobile), the button is wrapped in a tooltip that appears on hover.
 *
 * @param asChild - If true, renders the button as a child component using a Slot.
 * @param isActive - Indicates whether the button is in an active state.
 * @param tooltip - Tooltip content or configuration to display when the sidebar is collapsed.
 * @returns The sidebar menu button, optionally wrapped in a tooltip.
 */
function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "default",
	tooltip,
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
	isActive?: boolean
	tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : "button"
	const { isMobile, state } = useSidebar()

	const button = (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	)

	if (!tooltip) {
		return button
	}

	if (typeof tooltip === "string") {
		tooltip = {
			children: tooltip,
		}
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	)
}

/**
 * Renders an action button for a sidebar menu item, optionally as a child component and with configurable hover visibility.
 *
 * The button is positioned absolutely within the menu item and is hidden when the sidebar is icon-collapsed. When `showOnHover` is true, the button becomes visible on hover or focus of the parent menu item.
 *
 * @param asChild - If true, renders the button as a child component using a Slot.
 * @param showOnHover - If true, the button is only visible when the parent menu item is hovered or focused.
 */
function SidebarMenuAction({
	className,
	asChild = false,
	showOnHover = false,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean
	showOnHover?: boolean
}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			className={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				// Increases the hit area of the button on mobile.
				"after:absolute after:-inset-2 md:after:hidden",
				"peer-data-[size=sm]/menu-button:top-1",
				"peer-data-[size=default]/menu-button:top-1.5",
				"peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				showOnHover &&
					"peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Displays a badge for a sidebar menu item, typically used to show counts or status indicators.
 *
 * The badge is positioned absolutely on the right side of the menu item and is hidden when the sidebar is in icon-collapsed mode.
 */
function SidebarMenuBadge({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
				"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
				"peer-data-[size=sm]/menu-button:top-1",
				"peer-data-[size=default]/menu-button:top-1.5",
				"peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a skeleton placeholder for a sidebar menu item, optionally including an icon.
 *
 * @param showIcon - Whether to display a skeleton icon alongside the text placeholder
 */
function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: React.ComponentProps<"div"> & {
	showIcon?: boolean
}) {
	// Random width between 50 to 90%.
	const width = React.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`
	}, [])

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="size-4 rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="h-4 max-w-(--skeleton-width) flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as React.CSSProperties
				}
			/>
		</div>
	)
}

/**
 * Renders a styled container for a sidebar submenu, displaying its children in a vertical list.
 *
 * Hidden when the sidebar is in icon-collapsed mode.
 */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				"border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
				"group-data-[collapsible=icon]:hidden",
				className
			)}
			{...props}
		/>
	)
}

/**
 * Renders a list item for a sidebar submenu, applying appropriate styling and data attributes.
 */
function SidebarMenuSubItem({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn("group/menu-sub-item relative", className)}
			{...props}
		/>
	)
}

/**
 * Renders a styled submenu button for sidebar menu sub-items.
 *
 * Supports rendering as a custom element via `asChild`, two size options, and an active state. Hidden when the sidebar is icon-collapsed.
 *
 * @param asChild - If true, renders as a child component instead of an anchor element.
 * @param size - The size of the button, either "sm" or "md".
 * @param isActive - Whether the button is in the active state.
 */
function SidebarMenuSubButton({
	asChild = false,
	size = "md",
	isActive = false,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean
	size?: "sm" | "md"
	isActive?: boolean
}) {
	const Comp = asChild ? Slot : "a"

	return (
		<Comp
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={size}
			data-active={isActive}
			className={cn(
				"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				"data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
				size === "sm" && "text-xs",
				size === "md" && "text-sm",
				"group-data-[collapsible=icon]:hidden",
				className
			)}
			{...props}
		/>
	)
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	useSidebar,
}
