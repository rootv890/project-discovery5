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

export function loadRandomShapes(count: number = 4) {
	// pick random shapes from shapes.json
	// just rreturn the path
	const shapeKeys = Object.keys(shapes.shapes)
	const randomShapes = shapeKeys.sort(() => Math.random() - 0.5).slice(0, count)
	return randomShapes.map(
		(key) => shapes.shapes[key as keyof typeof shapes.shapes].path
	)
}
