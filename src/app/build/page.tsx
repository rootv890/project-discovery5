"use client"
import React from "react"
import MorphLoader from "@/components/MorphLoader"
import LinearProgress from "@/components/LinearProgress"
import CircularProgress from "@/components/CircularProgress"

const page = () => {
	const [date, setDate] = React.useState<Date>()
	return (
		<div className="h-screen flex flex-col justify-center items-center gap-4 p-4">
			{/* <MorphLoader
				pathColor="inverse-primary"
				bgColor="primary"
				count={10}
				eachDuration={0.4}
				autoPlay={true}
			/> */}
			<div className="w-full h-10 max-w-md">
				<LinearProgress
					size="md"
					progress={0.5}
					// indeterminate
					// buffer={0.8}
				/>
				<CircularProgress
					size="md"
					progress={0.5}
					// indeterminate
				/>
			</div>
		</div>
	)
}

export default page
