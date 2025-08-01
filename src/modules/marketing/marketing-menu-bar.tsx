"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMenuSidebarStore } from "@/store/menu-sidebar-store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { SplitText } from "gsap/SplitText"
import { SignalIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { RiDiscordFill, RiGithubFill, RiTwitterXFill } from "react-icons/ri"

gsap.registerPlugin(MorphSVGPlugin, SplitText)

const menuItems = [
	{ id: "home", path: "/landing", label: "Home" },
	{ id: "dashboard", path: "/dashboard", label: "Dashboard" },
	{ id: "about", path: "/about", label: "About" },
	{ id: "contact", path: "/contact", label: "Contact" },
]

const socialItems = [
	{ id: "twitter", icon: RiTwitterXFill, label: "Twitter/X", url: "#" },
	{ id: "github", icon: RiGithubFill, label: "Github", url: "#" },
	{ id: "discord", icon: RiDiscordFill, label: "Discord", url: "#" },
]

// SVG paths
const menuPath = "M3 6h18M3 12h18M3 18h18" // Hamburger
const closePath = "M6 6l12 12M6 18L18 6" // X icon

const MenuSidebar = () => {
	const { open, toggle } = useMenuSidebarStore()
	const sidebarRef = useRef<HTMLDivElement | null>(null)
	const pathRef = useRef<SVGPathElement | null>(null)
	const menuRefs = useRef<HTMLElement[]>([])

	// Slide sidebar in/out
	useGSAP(() => {
		const element = sidebarRef.current
		if (!element) return

		gsap.set(element, {
			x: "100%",
			opacity: 0,
		})

		gsap.to(element, {
			x: open ? 0 : "100%",
			duration: 0.5,
			opacity: 1,
			ease: "sine.inOut",
			display: "flex",
		})
	}, [open])

	// Morph the menu/close icon
	useGSAP(() => {
		if (!pathRef.current) return

		gsap.to(pathRef.current, {
			duration: 0.5,
			morphSVG: open ? closePath : menuPath,
			ease: "power2.inOut",
		})
	}, [open])

	// Animate menu items & socials
	// useGSAP(() => {
	// 	const element = sidebarRef.current
	// 	if (!element || !open) return

	// 	const tl = gsap.timeline()

	// 	menuRefs.current.forEach((el) => {
	// 		const split = new SplitText(el, { type: "chars" })
	// 		tl.from(
	// 			split.chars,
	// 			{
	// 				y: 100,
	// 				opacity: 0,
	// 				stagger: 0.035,
	// 				ease: "power2.inOut",
	// 				duration: 0.6,
	// 				delay: 0.2,
	// 				filter: "blur(50px)",
	// 			},
	// 			"<"
	// 		)
	// 	})

	// 	const socialEls = element.querySelectorAll("#social-items li") ?? []

	// 	tl.from(
	// 		"#social-items",
	// 		{
	// 			y: 100,
	// 			opacity: 0,
	// 			ease: "power2.inOut",
	// 			duration: 0.5,
	// 		},
	// 		"<+0.4"
	// 	).from(
	// 		socialEls,
	// 		{
	// 			y: 50,
	// 			opacity: 0,
	// 			stagger: 0.1,
	// 			ease: "power2.out",
	// 			duration: 0.5,
	// 		},
	// 		"<=0"
	// 	)
	// }, [open])
	useGSAP(() => {
		if (!open || !sidebarRef.current) return

		const items = gsap.utils.toArray(menuRefs.current)
		const socials = sidebarRef.current.querySelectorAll("#social-items li")

		const tl = gsap.timeline()

		items.forEach((item: any, i) => {
			tl.fromTo(
				item,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: -20,
					duration: 0.35,
					ease: "power2.out",
					delay: i * 0.06,
				},
				0
			).to(
				item,
				{
					y: 0,
					duration: 0.35,
					ease: "back.out(1.7)",
				},
				`<`
			)
		})

		// Social icons — smooth glide after items
		tl.fromTo(
			socials,
			{ y: 40 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.1,
				duration: 0.5,
				ease: "power2.out",
			},
			"-=0.3"
		)
	}, [open])

	return (
		<div className="fixed right-0 z-50 top-0 w-full  max-w-screen mx-auto justify-end flex left-0 ">
			<button
				onClick={toggle}
				className="absolute z-60 p-4 pt-5 cursor-pointer"
				aria-label="Toggle Menu"
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-primary cursor-pointer hover:scale-125 transition-all ease-linear duration-500"
				>
					<path
						ref={pathRef}
						d={menuPath}
					/>
				</svg>
			</button>

			<div
				ref={sidebarRef}
				onBlur={() => open && toggle()}
				className={cn(
					"w-[40%] absolute  flex-col-s-b bg-white h-screen right-0",
					!open ? "hidden" : "flex-col-s-b"
				)}
			>
				<ul
					id="menu-items"
					className="flex-col-s-s p-6"
				>
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link href={item.path}>
								<h2
									// @ts-ignore
									ref={(el) => (menuRefs.current[index] = el)}
									className="uppercase text-primary hover:text-[#FF5EDB] text-[4rem] font-bold transition-all ease-in-out"
								>
									{item.label}
								</h2>
							</Link>
						</li>
					))}
				</ul>

				<ul
					id="social-items"
					className="flex items-center p-6 gap-4 w-full bg-primary-fixed-dim"
				>
					{socialItems.map((item, index) => (
						<li
							key={index}
							className="text-primary hover:text-primary/70"
						>
							<a href={item.url}>
								<span className="sr-only text-[4rem] font-bold">
									{item.label}
								</span>
								<item.icon size={42} />
							</a>
						</li>
					))}
					<li className="ml-auto">
						<Button
							size="md"
							variant={"inverted"}
						>
							Sign In or Login
						</Button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MenuSidebar
