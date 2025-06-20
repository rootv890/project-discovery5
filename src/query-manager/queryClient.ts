import { cache } from "react"
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

export const queryClient = cache(() => {
	return new QueryClient({
		queryCache: new QueryCache({
			onError: (error, query) => {
				if (process.env.NODE_ENV === "development") {
					console.error(error, query)
				}
				// TODO: toast.error()
			},
		}),
		mutationCache: new MutationCache({
			onError: (error, mutation) => {
				if (process.env.NODE_ENV === "development") {
					console.error(error, mutation)
				}
				// TODO: toast.error()
			},
		}),
		defaultOptions: {
			queries: {
				retry: 1,
				staleTime: Infinity,
				gcTime: 1000 * 60 * 50,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchInterval: false,
			},
			mutations: {
				retry: 3,
				retryDelay: 1000,
			},
		},
	})
})
