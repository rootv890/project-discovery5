"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import {
	CategoriesSidebarErrorFallback,
	CategoriesSidebarSkeleton,
	CategoriesSidebarWrapper,
} from "@/modules/categories/ui"
import Navbar from "@/modules/navbar/Navbar"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

type Props = {
	children?: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<SidebarProvider className="flex mt-18 flex-col w-full">
			<Navbar />
			<div className="flex size-full relative">
				<ErrorBoundary
					fallback={
						<CategoriesSidebarErrorFallback
							error={{
								name: "CategoriesLoadError",
								message: "Failed to load categories. Please try again later.",
							}}
							resetErrorBoundary={() => {}}
						/>
					}
				>
					<Suspense fallback={<CategoriesSidebarSkeleton />}>
						<CategoriesSidebarWrapper />
					</Suspense>
				</ErrorBoundary>

				{/* Main Content */}
				{children}
			</div>
		</SidebarProvider>
	)
}

export default DashboardLayout
