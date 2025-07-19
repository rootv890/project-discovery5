"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import {
	CategoriesSidebarErrorFallback,
	CategoriesSidebarSkeleton,
} from "@/modules/categories/ui/categories-sidebar-fallbacks"
import CategoriesSidebarWrapper from "@/modules/categories/ui/categories-siderbar-wrapper"
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
							resetErrorBoundary={() => {
								// Optional reset logic
							}}
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
