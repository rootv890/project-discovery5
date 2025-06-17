"use client"
import React from "react"
import MorphLoader from "@/components/MorphLoader"
import LinearProgress from "@/components/LinearProgress"
import CircularProgress from "@/components/CircularProgress"
import Slider2 from "@/components/Slider"
import Switch, { SwitchEvent } from "@/components/Switch"
import { Label } from "@/components/ui/label"
import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"

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
			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault()
					console.log(e.target)
					const formData = new FormData(e.target as HTMLFormElement)
					const data = Object.fromEntries(formData)
					console.log("Submitted ", data)
				}}
			>
				<div className="flex flex-col gap-4 w-[400px]">
					<TextField
						label="Full Name"
						required
						name="fullName"
						type="text"
						variant="outlined"
						placeholder="John Doe"
						prefixText="@"
					/>

					<TextField
						label="age"
						prefix="@"
						required
						name="age"
						type="number"
						variant="outlined"
						placeholder="22"
					/>
					<TextField
						label="Email"
						required
						name="email"
						type="email"
						variant="outlined"
					/>

					<TextField
						label="Password"
						required
						name="password"
						type="password"
						variant="outlined"
					/>

					<TextField
						label="Description"
						name="description"
						type="textarea"
						variant="outlined"
						rows={4}
						supportingText="Tell us a bit about yourself"
					/>

					<Button
						type="submit"
						className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
					>
						Sign Up
					</Button>
				</div>
			</form>
		</div>
	)
}

export default page
