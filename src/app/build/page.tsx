"use client"
import React from "react"
import MorphLoader from "@/components/MorphLoader"
import LinearProgress from "@/components/LinearProgress"
import CircularProgress from "@/components/CircularProgress"
import Slider2 from "@/components/Slider"
import Switch from "@/components/Switch"
import { Label } from "@/components/ui/label"

const page = () => {
	const [date, setDate] = React.useState<Date>()
	return (
		<div className="h-screen flex flex-col justify-center items-center gap-4 p-4">
			{/* <MorphLoader
				pathColor="inverse-primary"
				bgColor="primary"
				count={6}
				eachDuration={0.4}
				autoPlay={true}
			/> */}
			<Label>
				Wifi
				<Switch
					selected={true}
					isDestructive
					onChange={(e) => {
						console.log("Selected:", e.target.selected)
					}}
				/>
			</Label>
		</div>
	)
}

export default page
