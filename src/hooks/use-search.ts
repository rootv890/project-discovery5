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

/**
 * React hook for managing search state, including the search query and whether a search is active.
 *
 * Provides methods to update the query, toggle the searching state, clear the search, and handle search input changes. Optionally invokes a callback when a search is performed.
 *
 * @param onSearch - Optional callback invoked with the search query whenever a search is performed
 * @returns An object containing the current query, searching state, and functions to manage search behavior
 */
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
