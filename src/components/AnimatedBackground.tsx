"use client"
import React from "react"

type AnimBGProps = {
	children: React.ReactNode
	from?: string
	via?: string
	to?: string
	blur?: boolean
}

const AnimBG = ({
	children,
	from = "#d2c1ff",
	via = "#f6e8ff",
	to = "#c2ebff",
	blur = true,
}: AnimBGProps) => {
	return (
		<div
			className="relative h-full w-full overflow-hidden animate-gradient-xy bg-size-200"
			style={{
				backgroundImage: `linear-gradient(to bottom right, ${from}, ${via}, ${to})`,
			}}
		>
			{blur && (
				<div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-0" />
			)}
			<div className="relative z-10 h-full w-full">{children}</div>
		</div>
	)
}

export default AnimBG
