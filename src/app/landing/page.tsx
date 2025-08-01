// app/page.tsx or wherever your page is
"use client"

import gsap from "gsap"
import { SplitText } from "gsap/all"
import GUI from "lil-gui"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import GridLines from "@/modules/marketing/grid-lines"
import HeroToolCard from "@/modules/marketing/marketing-hero-card"
import MarketingSearchBar from "@/modules/marketing/marketing-searchbar"
import MeshGradient from "@/modules/marketing/mesh-gradient"

gsap.registerPlugin(SplitText)

const pinkPurpleGradient = ["#FF5EDB", "#FF8AE2", "#FF98BA"]

const Page = () => {
	const [colors, setColors] = useState(pinkPurpleGradient)

	useEffect(() => {
		const gui = new GUI()
		gui.close()
		gui.hide()

		const colorObject = {
			color1: colors[0],
			color2: colors[1],
			color3: colors[2],
		}

		gui.addColor(colorObject, "color1").onChange((val: string) => {
			setColors((prev) => [val, prev[1], prev[2]])
		})
		gui.addColor(colorObject, "color2").onChange((val: string) => {
			setColors((prev) => [prev[0], val, prev[2]])
		})
		gui.addColor(colorObject, "color3").onChange((val: string) => {
			setColors((prev) => [prev[0], prev[1], val])
		})

		return () => gui.destroy()
	}, [])

	return (
		<div className="relative size-full h-screen overflow-clip w-full flex flex-col items-stretch justify-end bg-purple-600">
			{/* Background */}
			<div className="pointer-events-none absolute inset-0 z-0">
				<GridLines />
				<MeshGradient
					colors={colors}
					speed={0.04}
					blur={50}
					grain={true}
					className="absolute top-0 left-0 w-full h-full"
				/>
			</div>
			{/* Content */}
			<div className="relative z-20 w-full flex flex-col items-center text-center px-4 pt-12 gap-8">
				{/* Heading */}
				<div className="flex flex-col flex-center">
					<Badge className="glass px-2 text-on-primary/80 grain-overlay glass-shadow">
						Running on Nightly v0.1.0. Want in early? Shoot us an email.
						<div className="bg-emerald-400 animate-pulse size-2 rounded-full"></div>
					</Badge>
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance text-on-primary">
						Get Access to Hundreds of Worthy Resources Available
					</h1>
					<p className="text-md md:text-xl text-on-primary ">
						Unlock your creativity, gain valuable assets and grow your business
						with a wide range of resources
					</p>
				</div>

				{/* Search Bar */}
				<MarketingSearchBar />

				{/* Hero Image + Cards */}
				<div className="relative  flex flex-e-c h-full w-full  ">
					{/* SEMI CIRCLE */}
					<div className="w-[80vw] translate-y-1/2 absolute bottom-0  -z-10 left-1/2 -translate-x-1/2 blur-3xl aspect-square bg-[#f8d2df]  rounded-full pointer-events-none"></div>

					<div className="  md:w-[60vw] md:h-[50vh] relative overflow-clip rounded-t-4xl  border-3 border-b-0 border-on-primary/30 shadow-2xl ">
						<Image
							src="/images/hero-img.jpg"
							alt="hero-img of app ui"
							fill
							className="object-cover object-top"
						/>
					</div>

					{/* Right Card */}
					<HeroToolCard
						position="right"
						className="top-[calc(50%-35vh)] left-[calc(50%+30vw)]"
					>
						<p className="text-sm text-gray-600">🔥 Trending</p>
						<h3 className="text-xl font-semibold text-primary">
							"AI Landing Page Generator"
						</h3>
						<p className="text-xs text-muted">+142 saves this week</p>
					</HeroToolCard>
					{/* Left Card */}
					<HeroToolCard
						position="right"
						className="bottom-[calc(50%-20vh)] right-[calc(50%+20vw)]"
					>
						<p className="text-sm text-gray-600">🧠 Resources Unlocked</p>
						<h3 className="text-3xl font-bold text-primary">120+</h3>
						<p className="text-xs text-muted">
							Across Design, Dev, and Marketing
						</p>
					</HeroToolCard>
				</div>
			</div>
		</div>
	)
}

export default Page
