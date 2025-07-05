"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

type Props = {}
const DashboardPageView = (props: Props) => {
	const trpc = useTRPC()
	const { data: categories } = useSuspenseQuery(
		trpc.categories.getManyForSidebar.queryOptions({})
	)
	return (
		<div className="w-full min-h-[12000px] p-4">
			<div className="flex items-start justify-between">
				<div className="flex-1 p-4">
					<h1 className="text-2xl font-bold">Dashboard Page</h1>
					<p>Welcome to the dashboard!</p>
					<pre
						className={
							"max-w-md bg-green-300 text-wrap break-words p-4 rounded-lg"
						}
					>
						{JSON.stringify(categories, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	)
}
export default DashboardPageView
