"use client"

import { cn } from "@/lib/utils" // Assuming this is a utility for classnames
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { useRef } from "react"
// We'll use a simplex noise library for organic movement.
// In a real project, you'd install this: `npm install simplex-noise`
// For this example, I'll assume it's available globally or imported.
import { createNoise2D, NoiseFunction2D } from "simplex-noise"

const noise2d = createNoise2D()

// Helper function to map a value from one range to another
const map = (
	n: number,
	start1: number,
	end1: number,
	start2: number,
	end2: number
) => {
	return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

interface MeshGradientProps {
	className?: string
	colors?: string[]
	speed?: number
	blur?: number
	grain?: boolean
}

const MeshGradient = ({
	className,
	colors = ["#ff0000", "#0000ff", "#00ff00", "#ffff00"],
	speed = 0.005, // Reduced speed for a more subtle effect
	blur = 80,
	grain = false,
}: MeshGradientProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	// Use a ref to hold animation-related data that doesn't need to trigger re-renders
	const animationData = useRef<{
		particles: any[]
		simplex: NoiseFunction2D | null
	}>({ particles: [], simplex: null })

	useGSAP(
		() => {
			const canvas = canvasRef.current
			if (!canvas) return
			const ctx = canvas.getContext("2d")
			if (!ctx) return

			// Initialize simplex noise
			//  noise2d(canvas.width, canvas.height)
			animationData.current.simplex = createNoise2D()

			let animationFrameId: number

			// Particle creation function
			const createParticles = () => {
				animationData.current.particles = colors.map((color) => {
					const radius =
						Math.random() * (Math.min(canvas.width, canvas.height) * 0.3) +
						Math.min(canvas.width, canvas.height) * 0.1
					return {
						x: Math.random() * canvas.width,
						y: Math.random() * canvas.height,
						color,
						radius,
						// Add random offsets for the noise field to make each particle unique
						noiseOffsetX: Math.random() * 1000,
						noiseOffsetY: Math.random() * 1000,
					}
				})
			}

			const drawParticle = (p: any) => {
				ctx.beginPath()
				const gradient = ctx.createRadialGradient(
					p.x,
					p.y,
					0,
					p.x,
					p.y,
					p.radius
				)
				gradient.addColorStop(0, p.color)
				gradient.addColorStop(1, p.color)
				gradient.addColorStop(1, p.color)

				ctx.fillStyle = gradient
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
				ctx.fill()
			}

			const tick = () => {
				const t = gsap.ticker.time
				const simplex = animationData.current.simplex
				ctx.clearRect(0, 0, canvas.width, canvas.height)

				animationData.current.particles.forEach((p) => {
					if (!simplex) return
					const noiseX = simplex(p.noiseOffsetX + t * speed, p.noiseOffsetX)
					const noiseY = simplex(p.noiseOffsetY, p.noiseOffsetY + t * speed)

					p.x = map(noiseX, -1, 1, 0, canvas.width)
					p.y = map(noiseY, -1, 1, 0, canvas.height)

					drawParticle(p)
				})
			}

			// Resize handler
			const handleResize = () => {
				const parent = canvas.parentElement
				if (parent) {
					canvas.width = parent.clientWidth
					canvas.height = parent.clientHeight
					// Re-create particles when the canvas size changes
					createParticles()
				}
			}

			const resizeObserver = new ResizeObserver(handleResize)
			if (canvas.parentElement) {
				resizeObserver.observe(canvas.parentElement)
			}

			// Initial setup
			handleResize()
			gsap.ticker.add(tick)

			// Cleanup function
			return () => {
				gsap.ticker.remove(tick)
				if (canvas.parentElement) {
					resizeObserver.unobserve(canvas.parentElement)
				}
			}
		},
		{ scope: canvasRef, dependencies: [colors, speed, blur] }
	)

	return (
		<div className={cn("relative size-full overflow-hidden", className)}>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 size-full"
				style={{
					filter: `blur(${blur}px)`,
					// A dark background often works well for mesh gradients
					// backgroundColor: `${colors?.[0]}`,
					backgroundColor: `rebeccaviolet`,
				}}
			/>
			{grain && (
				<div
					className="absolute inset-0 size-full opacity-20"
					style={{
						backgroundImage:
							"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
					}}
				/>
			)}
		</div>
	)
}

export default MeshGradient
