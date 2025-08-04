import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import shapes from "./shapes.json"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function loadSVGPath(path: string) {
	try {
		const res = await fetch(path)
		const text = await res.text()

		// Parse the svg and extract the first path
		const parser = new DOMParser()
		const doc = parser.parseFromString(text, "image/svg+xml")
		const pathEl = doc.querySelector("path")
		// setorigin of the path to the center of the svg
		pathEl?.setAttribute("transform", "translate(50%, 50%)")
		return pathEl?.getAttribute("d") ?? null
	} catch (error) {
		console.error(`Error loading SVG path: ${path}`, error)
		return ""
	}
}

/**
 * Returns an array of SVG path strings for a specified number of randomly selected shapes.
 *
 * @param count - The number of random shapes to select (default is 4)
 * @returns An array of SVG path data strings corresponding to the selected shapes
 */
export function loadRandomShapes(count: number = 4) {
	// pick random shapes from shapes.json
	// just rreturn the path
	const shapeKeys = Object.keys(shapes.shapes)
	const randomShapes = shapeKeys.sort(() => Math.random() - 0.5).slice(0, count)
	return randomShapes.map(
		(key) => shapes.shapes[key as keyof typeof shapes.shapes].path
	)
}

import { customAlphabet, nanoid } from "nanoid"

const alphabet = "1234567890abcdefghijklmnopqrstuvwxyz"
const idLength = 6

// 1. Define allowed string types
type IdType =
	| "tool"
	| "feature"
	| "category"
	| "creator"
	| "toolCategory"
	| "platform"
	| "toolPlatform"
	| "tag"
	| "toolTag"
	| "toolCreator"
	| "other"
	| "award"
	| "comment"
	| "toolComment"
	| "collection"
	| "toolCollection"

// 2. Prefix map (internal use only)
const prefixMap = {
	tool: "t",
	category: "c",
	feature: "f",
	toolCategory: "tc",
	creator: "cr",
	toolCreator: "tcr",
	platform: "p",
	tag: "tg",
	toolTag: "ttg",
	toolPlatform: "tp",
	other: "o",
	comment: "cm",
	toolComment: "tcmt",
	award: "a",
	collection: "cl",
	toolCollection: "tcl",
} as const satisfies Record<IdType, string>

/**
 * Generates a unique ID string with a type-specific prefix.
 *
 * @param type - The category of entity for which to generate the ID
 * @returns A unique ID string composed of the prefix for the given type and a random 6-character suffix
 */
export function generateId(type: IdType): string {
	const prefix = prefixMap[type]
	return `${prefix}_${nanoid(idLength)}`
}

/**
 * Removes specific form registration properties from the input object and returns the remaining properties.
 *
 * @param registerReturn - The object containing form registration properties to be cleaned.
 * @returns The input object without `min`, `max`, `valueAsNumber`, `valueAsDate`, `setValueAs`, and `shouldUnregister` properties.
 */
export function cleanRegisterProps(registerReturn: any) {
	const {
		min,
		max,
		valueAsNumber,
		valueAsDate,
		setValueAs,
		shouldUnregister,
		...rest
	} = registerReturn
	return rest
}

/**
 * Detects the user's operating system based on the browser's user agent string.
 *
 * @returns The detected operating system: "mac", "windows", "linux", or "unknown"
 */
export function getOS() {
	const userAgent = window.navigator.userAgent.toLowerCase()
	if (userAgent.includes("mac")) return "mac"
	if (userAgent.includes("win")) return "windows"
	if (userAgent.includes("linux")) return "linux"
	return "unknown"
}
