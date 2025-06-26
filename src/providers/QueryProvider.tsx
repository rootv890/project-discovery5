"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { queryClient } from "@/query-manager/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient()}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
