"use client"
import React from "react"
import MorphLoader from "@/components/MorphLoader"

const page = () => {
	const [date, setDate] = React.useState<Date>()
	return (
		<div className="h-screen flex flex-col justify-center items-center gap-4 p-4">
			<MorphLoader
				pathColor="inverse-primary"
				bgColor="primary"
				count={10}
				eachDuration={0.4}
				autoPlay={true}
			/>
		</div>
	)
}

export default page
