"use client"

import { Button } from "@/components/ui/button"
import { Select } from "@/components/Select"
import React from "react"
import { useForm, Controller } from "react-hook-form"

const page = () => {
	return <DemoForm />
}

export default page

function DemoForm() {
	const { handleSubmit, control, watch } = useForm({
		defaultValues: {
			tool: "vite",
		},
	})

	const onSubmit = (data: any) => {
		console.log("Form Data", data)
	}

	const current = watch("tool")

	return (
		<div className="flex flex-col gap-4 p-4 h-screen w-screen justify-center items-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<label className="block text-sm font-medium text-gray-700">
					Tool (current: {current})
				</label>

				<Controller
					control={control}
					name="tool"
					render={({ field: { onChange, value } }) => (
						<Select
							// label="Select Tool"
							menuPositioning="popover"
							variant="filled"
							value={value}
							onChange={(e: any) => {
								console.log(e.target.value)
								onChange(e.target.value)
							}}
							options={[
								{
									value: "vite",
									headline: "Vite",
									supportingText: "Fast and modern",
								},
								{
									value: "webpack",
									headline: "Webpack",
									supportingText: "Robust legacy",
								},
								{
									value: "react",
									headline: "React",
									supportingText: "Fast and modern",
								},
								{
									value: "vue",
									headline: "Vue",
									supportingText: "Robust legacy",
								},
							]}
						/>
					)}
				/>
				<br />
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
