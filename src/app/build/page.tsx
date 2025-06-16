"use client"
import React from "react"
import MorphLoader from "@/components/MorphLoader"
import LinearProgress from "@/components/LinearProgress"
import CircularProgress from "@/components/CircularProgress"
import Slider2 from "@/components/Slider"

const page = () => {
	const [date, setDate] = React.useState<Date>()
	return (
		<div className="h-screen flex flex-col justify-center items-center gap-4 p-4">
			<MorphLoader
				pathColor="inverse-primary"
				bgColor="primary"
				count={6}
				eachDuration={0.4}
				autoPlay={true}
			/>
			<Slider2
				min={0}
				max={100}
				value={50}
				step={5}
				onInput={(e: any) => {
					console.log(e.target.value)
				}}
				disabled
			/>
		</div>
	)
}

export default page
