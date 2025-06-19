"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { cn, loadRandomShapes, loadSVGPath } from "@/lib/utils"

gsap.registerPlugin(MorphSVGPlugin)

type MorphLoaderProps = {
	count?: number
	eachDuration?: number
	autoPlay?: boolean
	manualShapes?: string[]
	pathColor?: string
	bgColor?: string
	size?: number
	className?: string
}

const MorphLoader = ({
	count = 4,
	eachDuration = 1,
	autoPlay = true,
	manualShapes,
	pathColor = "primary",
	bgColor = "surface-container",
	size = 96,
	className,
}: MorphLoaderProps) => {
	const scope = useRef<HTMLDivElement>(null)
	const [paths, setPaths] = useState<string[]>([])
	const [play] = useState(autoPlay)
	const timeline = useRef<gsap.core.Timeline | null>(null)
	const [, setProgress] = useState(0)

	const shapes = useMemo(
		() =>
			manualShapes
				? manualShapes.map((name) => `/shapes/${name}.svg`)
				: loadRandomShapes(count),
		[manualShapes, count]
	)

	// Load SVG path data
	useEffect(() => {
		const load = async () => {
			const ps = await Promise.all(shapes.map(loadSVGPath))
			setPaths(ps.filter((p): p is string => p !== null))
		}
		load()
	}, [shapes])

	useGSAP(
		() => {
			const pathEl = scope.current?.querySelector("path")
			if (!pathEl || paths.length < 2) return

			const rotatePer = (360 / paths.length) * 2
			const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.0, paused: true })

			paths.forEach((path, i) => {
				const next = paths[(i + 1) % paths.length]
				tl.to(pathEl, {
					duration: eachDuration,
					morphSVG: {
						shape: next,
						type: "linear",
					},
					rotation: `+=${rotatePer}`,
					ease: "power1.inOut",
					transformOrigin: "50% 50%",
					svgOrigin: "center center",
				})
			})

			timeline.current = tl
			if (play) tl.play()
			return () => tl.kill()
		},
		{ scope, dependencies: [paths] }
	)

	useEffect(() => {
		let frame: number
		const tick = () => {
			if (timeline.current && play) {
				setProgress(timeline.current.progress())
				frame = requestAnimationFrame(tick)
			}
		}
		if (play) frame = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(frame)
	}, [play])

	// const handleSeek = (value: number) => {
	// 	const pct = value / 100
	// 	timeline.current?.progress(pct)
	// 	setProgress(pct)
	// }

	return (
		<>
			<div
				ref={scope}
				className={cn(
					`rounded-full flex items-center justify-center p-4 will-change-transform bg-${bgColor}`,
					"select-none pointer-events-none",
					className
				)}
				style={{ willChange: "transform" }}
			>
				<svg
					viewBox="0 0 382 382"
					style={{ width: size, height: size }}
				>
					<path
						fill={`var(--${pathColor})`}
						d={paths[0] ?? ""}
					/>
				</svg>
			</div>
		</>
	)
}

export default MorphLoader
