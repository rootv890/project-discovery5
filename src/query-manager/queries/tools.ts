"use server"

import { db } from "@/db/db"
import { toolCategories } from "@/db/schema"

import { and, eq } from "drizzle-orm"

export interface FetchToolProps {
	id: string
}

export async function fetchToolById({ id }: FetchToolProps) {
	const data = await db.query.toolCategories.findFirst({
		with: {
			tool: true,
			category: true,
		},
		where: eq(toolCategories.toolId, id),
	})
	return data
}
