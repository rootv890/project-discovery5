"use client"

import { useCallback, useState } from "react"

interface UseSearchReturn {
	query: string
	setQuery: (query: string) => void
	isSearching: boolean
	setIsSearching: (searching: boolean) => void
	clearSearch: () => void
	handleSearch: (searchQuery: string) => void
}

export function useSearch(onSearch?: (query: string) => void): UseSearchReturn {
	const [query, setQuery] = useState("")
	const [isSearching, setIsSearching] = useState(false)

	const clearSearch = useCallback(() => {
		setQuery("")
		setIsSearching(false)
	}, [])

	const handleSearch = useCallback(
		(searchQuery: string) => {
			setQuery(searchQuery)
			setIsSearching(searchQuery.length > 0)
			onSearch?.(searchQuery)
		},
		[onSearch]
	)

	return {
		query,
		setQuery,
		isSearching,
		setIsSearching,
		clearSearch,
		handleSearch,
	}
}
