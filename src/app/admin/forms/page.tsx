"use client"

import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"
import { InsertCreatorType, InsertToolType } from "@/db/schema"
import { cleanRegisterProps } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CreateToolFormSchema = z.object({
	toolData: z.object({
		name: z.string().min(1, "Tool name is required"),
		slug: z.string().min(1, "Slug is required"),
		subtitle: z.string().min(1, "Subtitle is required"),
		description: z.string().nullable(),
		imageUrl: z.string().url().optional().or(z.literal("")),
		json: z.any(),
		pricing: z
			.enum([
				"free",
				"free open source",
				"paid",
				"freemium",
				"subscription",
				"one-time",
			])
			.default("free"),
		status: z.enum(["draft", "pending_review", "published"]).default("draft"),
	}) as z.ZodType<Omit<InsertToolType, "id" | "createdAt" | "updatedAt">>,

	categoryIds: z.array(z.string()).min(1, "At least one category is required"),
	platformIds: z.array(z.string()).min(1, "At least one platform is required"),
	tagIds: z.array(z.string()).min(1, "At least one tag is required"),

	creatorData: z.union([
		z.object({
			creatorId: z.string(),
		}),
		z.object({
			name: z.string().min(1, "Creator name is required"),
			slug: z.string().min(1, "Creator slug is required"),
			description: z.string().optional(),
			imageUrl: z.string().url().optional().or(z.literal("")),
			json: z.any().optional(),
			url: z.string().url().optional(),
		}) as z.ZodType<Omit<InsertCreatorType, "id" | "createdAt" | "updatedAt">>,
	]),
})

const FormPage = () => {
	const [useNewCreator, setUseNewCreator] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(CreateToolFormSchema),
	})

	const onSubmit = (data: z.infer<typeof CreateToolFormSchema>) => {
		console.log("Submitted:", data)
	}

	return (
		<div className="max-w-2xl mx-auto p-4 mt-12 bg-white rounded-2xl space-y-6">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<h2 className="text-xl font-bold">Basic Info</h2>

				<TextField
					{...cleanRegisterProps(register("toolData.name"))}
					placeholder="Tool Name"
				/>
				{errors.toolData?.name && (
					<p className="text-red-500">{errors.toolData.name.message}</p>
				)}

				<TextField
					{...cleanRegisterProps(register("toolData.slug"))}
					placeholder="Slug"
				/>
				{errors.toolData?.slug && (
					<p className="text-red-500">{errors.toolData.slug.message}</p>
				)}

				<TextField
					{...cleanRegisterProps(register("toolData.subtitle"))}
					placeholder="Subtitle"
				/>
				{errors.toolData?.subtitle && (
					<p className="text-red-500">{errors.toolData.subtitle.message}</p>
				)}

				<TextField
					type="textarea"
					{...cleanRegisterProps(register("toolData.description"))}
					placeholder="Description"
				/>
				{errors.toolData?.description && (
					<p className="text-red-500">{errors.toolData.description.message}</p>
				)}

				<TextField
					{...cleanRegisterProps(register("toolData.imageUrl"))}
					placeholder="Image URL"
				/>

				<select
					{...register("toolData.pricing")}
					className="select"
				>
					<option value="free">Free</option>
					<option value="free open source">Free Open Source</option>
					<option value="paid">Paid</option>
					<option value="freemium">Freemium</option>
					<option value="subscription">Subscription</option>
					<option value="one-time">One-Time</option>
				</select>

				<select
					{...register("toolData.status")}
					className="select"
				>
					<option value="draft">Draft</option>
					<option value="pending_review">Pending Review</option>
					<option value="published">Published</option>
				</select>

				<TextField
					{...cleanRegisterProps(register("categoryIds.0"))}
					placeholder="Category ID"
				/>
				{errors.categoryIds && (
					<p className="text-red-500">{errors.categoryIds.message}</p>
				)}

				<TextField
					{...cleanRegisterProps(register("platformIds.0"))}
					placeholder="Platform ID"
				/>
				{errors.platformIds && (
					<p className="text-red-500">{errors.platformIds.message}</p>
				)}

				<TextField
					{...cleanRegisterProps(register("tagIds.0"))}
					placeholder="Tag ID"
				/>
				{errors.tagIds && (
					<p className="text-red-500">{errors.tagIds.message}</p>
				)}

				<h2 className="text-xl font-bold">Creator</h2>

				<Button
					type="button"
					onClick={() => setUseNewCreator(!useNewCreator)}
				>
					{useNewCreator ? "Use Existing Creator" : "Add New Creator"}
				</Button>

				{useNewCreator ? (
					<>
						<TextField
							{...cleanRegisterProps(register("creatorData.name"))}
							placeholder="Creator Name"
						/>
						<TextField
							{...cleanRegisterProps(register("creatorData.slug"))}
							placeholder="Creator Slug"
						/>
						<TextField
							{...cleanRegisterProps(register("creatorData.imageUrl"))}
							placeholder="Creator Image URL"
						/>
						<TextField
							{...cleanRegisterProps(register("creatorData.url"))}
							placeholder="Creator Website URL"
						/>
					</>
				) : (
					<TextField
						{...cleanRegisterProps(register("creatorData.creatorId"))}
						placeholder="Existing Creator ID"
					/>
				)}

				<div className="flex gap-4">
					<Button
						type="submit"
						className="btn btn-primary"
					>
						Submit
					</Button>
					<Button
						type="button"
						variant="link"
						onClick={() => reset()}
						className="btn btn-outline"
					>
						Reset
					</Button>
				</div>
			</form>
		</div>
	)
}

export default FormPage
