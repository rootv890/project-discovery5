/**
 * @fileoverview useDebounce Hook - Performance Optimization for Search
 *
 * This hook provides debounced values to prevent excessive API calls:
 * - Delays value updates until user stops typing
 * - Configurable delay timing for different use cases
 * - Automatic cleanup to prevent memory leaks
 * - TypeScript generic support for any value type
 *
 * @author Your Development Team
 * @since 2025-01-01
 * @version 1.0.0
 */

import { useEffect, useState } from "react"

/**
 * useDebounce - Performance Hook for Delayed Value Updates
 *
 * This hook debounces rapidly changing values to prevent excessive
 * API calls or expensive operations. Commonly used for search inputs
 * where you want to wait until the user stops typing.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 *
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState("")
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 *
 * useEffect(() => {
 *   // This will only run 300ms after the user stops typing
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		// Set up the timeout to update the debounced value
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		// Clear the timeout if value changes before delay completes
		// This prevents the previous timeout from updating the value
		return () => {
			clearTimeout(timeoutId)
		}
	}, [value, delay])

	return debouncedValue
}
