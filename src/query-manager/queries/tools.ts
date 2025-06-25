"use server"

import { db } from "@/db/db"
import { toolCategories } from "@/db/schema"
import { eq } from "drizzle-orm"

export interface FetchToolProps {
	id: string
}

export async function fetchToolById({ id }: FetchToolProps) {
	if (typeof window !== "undefined") {
		console.warn("🚨 fetchToolById should not run on the client!")
	}
	const data = await db.query.toolCategories.findFirst({
		with: {
			tool: true,
			category: true,
		},
		where: eq(toolCategories.toolId, id),
	})
	return data
}
