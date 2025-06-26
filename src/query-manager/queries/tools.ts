import { useImperativeHandle } from "react"
import { id } from "zod/v4/locales"
import { features } from "./../../db/tables/features"
;("use server")

import { db } from "@/db/db"
import {
	creators,
	InsertCategoryType,
	InsertCreatorType,
	InsertFeatureType,
	InsertToolType,
	toolCategories,
	toolCreators,
	toolPlatforms,
	tools,
	toolTags,
} from "@/db/schema"
import { generateId } from "@/lib/utils"
import { and, eq } from "drizzle-orm"

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
