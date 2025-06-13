"use client"

import { cn } from "@/lib/utils"

/**
 * A simple, elegant wave animation component inspired by water filling up.
 * It's designed to be used as a loading indicator within other elements, like buttons.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional class names for custom styling.
 * @param {string} [props.waveColor="bg-white"] - The Tailwind CSS color class for the wave. Defaults to white.
 * @param {number} [props.amplitude=10] - The height of the wave crests.
 * @param {number} [props.speed=1] - The speed of the wave animation. 1 is normal speed.
 */
export default function WaveAnimation({
	className,
	waveColor = "bg-white",
	amplitude = 10,
	speed = 1,
}: {
	className?: string
	waveColor?: string
	amplitude?: number
	speed?: number
}) {
	const wavePath = `M0,${amplitude} C${300 / 4},${amplitude * 2} ${
		300 / 2
	},0 ${300},${amplitude} L300,100 L0,100 Z`

	const animationDuration = `${4 / speed}s`

	return (
		<div
			className={cn(
				"absolute inset-0 w-full h-full overflow-hidden text-transparent",
				className
			)}
			aria-hidden="true"
		>
			<style>
				{`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .wave-animation {
            animation: wave ${animationDuration} linear infinite;
          }
        `}
			</style>
			<div
				className={cn(
					"absolute bottom-0 left-0 w-[200%] h-full wave-animation",
					waveColor,
					"opacity-40"
				)}
			>
				<svg
					className="w-full h-full"
					viewBox="0 0 300 100"
					preserveAspectRatio="none"
				>
					<path
						d={wavePath}
						fill="currentColor"
					/>
				</svg>
			</div>
			<div
				className={cn(
					"absolute bottom-0 left-0 w-[200%] h-full wave-animation",
					waveColor,
					"opacity-60"
				)}
				style={{ animationDelay: "-2s", animationDuration: `${5 / speed}s` }}
			>
				<svg
					className="w-full h-full"
					viewBox="0 0 300 100"
					preserveAspectRatio="none"
				>
					<path
						d={wavePath}
						fill="currentColor"
					/>
				</svg>
			</div>
		</div>
	)
}
