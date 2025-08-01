"use client"

import { VerticalProductCard } from "@/components/VerticalProductCard"
import {
	ProductGrid,
	ResponsiveContainer,
} from "@/components/ui/responsive-grid"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

type Props = {}

// Sample data for demonstration
const sampleProducts = [
	{
		imageSrc: "/placeholder-image.png",
		title: "Amazing Product 1",
		subtitle: "A fantastic tool for developers",
		description:
			"This is a detailed description of the amazing product that helps developers build better applications.",
		visitUrl: "https://example.com",
		moreInfoUrl: "https://example.com/info",
	},
	{
		imageSrc: "/placeholder-image.png",
		title: "Incredible Tool 2",
		subtitle: "Perfect for design workflows",
		description:
			"An incredible tool that streamlines your design process and makes collaboration easier.",
		visitUrl: "https://example.com",
		moreInfoUrl: "https://example.com/info",
	},
	{
		imageSrc: "/placeholder-image.png",
		title: "Super App 3",
		subtitle: "All-in-one solution",
		description:
			"A comprehensive application that combines multiple tools into one seamless experience.",
		visitUrl: "https://example.com",
	},
	{
		imageSrc: "/placeholder-image.png",
		title: "Pro Software 4",
		subtitle: "Enterprise-grade solution",
		description:
			"Professional software designed for large-scale operations and enterprise needs.",
		moreInfoUrl: "https://example.com/info",
	},
	{
		imageSrc: "/placeholder-image.png",
		title: "Creative Studio 5",
		subtitle: "For artists and creators",
		description:
			"A creative suite that empowers artists to bring their visions to life.",
		visitUrl: "https://example.com",
		moreInfoUrl: "https://example.com/info",
	},
	{
		imageSrc: "/placeholder-image.png",
		title: "Developer Kit 6",
		subtitle: "Essential tools for coding",
		description:
			"Everything you need to start coding and building amazing applications.",
		visitUrl: "https://example.com",
	},
]

const DashboardPageView = (props: Props) => {
	const trpc = useTRPC()
	const { data: categories } = useSuspenseQuery(
		trpc.categories.getManyForSidebar.queryOptions({})
	)

	return (
		<ResponsiveContainer
			maxWidth="7xl"
			className="py-8"
		>
			<div className="space-y-12">
				{/* Header Section */}
				<div className="space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-lg text-muted-foreground max-w-2xl ">
						Welcome to your dashboard! Explore our featured products and
						discover amazing tools.
					</p>
				</div>

				<ProductGrid
					cardType="vertical"
					// gap="lg"
				>
					{sampleProducts.slice(0, 6).map((product, index) => (
						<VerticalProductCard
							key={index}
							{...product}
							description={product.description || "No description available"}
							variant="filled"
							imageSrc={"/images/hero-img.jpg"}
						/>
					))}
				</ProductGrid>

				{/* Debug Section (can be removed) */}
				{/* <section className="space-y-4">
					<h3 className="text-xl font-semibold">Categories Data</h3>
					<div className="bg-muted rounded-lg p-4 max-h-60 overflow-auto">
						<pre className="text-sm">{JSON.stringify(categories, null, 2)}</pre>
					</div>
				</section> */}
			</div>
		</ResponsiveContainer>
	)
}

export default DashboardPageView
