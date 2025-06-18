"use client"

import { Button } from "@/components/ui/button"
import { Select } from "@/components/Select"
import { useForm, Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { CheckCircle } from "lucide-react"
import { Google } from "iconsax-reactjs"

const page = () => {
	return (
		<div className="h-screen w-full flex flex-col items-center justify-center">
			<DemoForm />
			<Button
				onClick={() => {
					toast.success("great! thanks")
				}}
			>
				Toast Now
			</Button>
		</div>
	)
}

export default page

function DemoForm() {
	const { handleSubmit, control, watch } = useForm({
		defaultValues: {
			tool: "vite",
		},
	})

	const onSubmit = (data: unknown) => {
		console.log("Form Data", data)
		toast.success("great! thanks", {
			icon: (
				<Google
					size={20}
					variant="Bold"
				/>
			),
		})
		toast.error("THis is long emssage that should be truncated	", {
			icon: <CheckCircle size={20} />,
		})
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
