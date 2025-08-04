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
 * Returns a debounced version of the input value that updates only after the specified delay.
 *
 * Useful for reducing unnecessary updates or API calls when the input value changes rapidly, such as during user typing.
 *
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds (default: 300)
 * @returns The debounced value, updated after the delay when the input value remains unchanged
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
