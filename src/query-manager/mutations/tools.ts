"use server"
import { db } from "@/db/db"
import {
	creators,
	features,
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

interface CreateANewToolProps {
	toolData: InsertToolType
	featuresData: InsertFeatureType
	categoryIds: string[]
	platformIds: string[]
	tagIds: string[]
	creatorData:
		| InsertCreatorType
		| {
				creatorId: string
		  }
}
export async function createANewTool({
	toolData,
	featuresData,
	categoryIds,
	platformIds,
	tagIds,
	creatorData,
}: CreateANewToolProps) {
	try {
		// 0. Validation and tool duplication!
		if (categoryIds.length < 1 || platformIds.length < 1) {
			throw new Error("Atleast one CategoryID and PlatformId are required")
		}
		if (tagIds.length < 1) {
			throw new Error("Atleast one TagId is required")
		}
		const {
			name,
			subtitle,
			description,
			slug,
			imageUrl,
			json,
			status = "pending_review",
		} = toolData
		if (!name || !slug || !subtitle) {
			throw new Error("Tool name, slug are required")
		}
		// TRANSACTION

		return await db.transaction(async (tx) => {
			// 1. create the tool  and get the id
			const toolId = generateId("tool")
			const [createdTool] = await tx
				.insert(tools)
				.values({
					id: toolId,
					name,
					description,
					subtitle,
					slug,
					imageUrl,
					json,
					status,
				})
				.returning()
			// 2.  Add all features JSON to  features to the respective toolId
			const featureId = generateId("feature")
			await tx.insert(features).values({
				id: featureId,
				json: featuresData.json,
				toolId: createdTool.id,
			})

			// 3. Create all new T-C with toolId + cateogryId
			async function newToolCategory(toolId: string, categoryId: string) {
				const toolCategoryId = generateId("toolCategory")
				// check for existence
				const exists = await db.query.toolCategories.findFirst({
					where: and(
						eq(toolCategories.toolId, toolId),
						eq(toolCategories.categoryId, categoryId)
					),
				})
				if (exists) return
				return await tx.insert(toolCategories).values({
					id: toolCategoryId,
					toolId: createdTool.id,
					categoryId: categoryId,
				})
			}

			await Promise.all(
				categoryIds.map((cid) => newToolCategory(createdTool.id, cid))
			)

			// 4. Create new T-P with toolId + platformId
			async function newToolPlatform(toolId: string, platformId: string) {
				const toolplatformId = generateId("toolPlatform")
				// check for existence
				const exists = await db.query.toolPlatforms.findFirst({
					where: and(
						eq(toolPlatforms.toolId, toolId),
						eq(toolPlatforms.platformId, platformId)
					),
				})
				if (exists) return
				return await tx.insert(toolPlatforms).values({
					id: toolplatformId,
					toolId: createdTool.id,
					platformId: platformId,
				})
			}

			await Promise.all(
				platformIds.map((pid) => newToolPlatform(createdTool.id, pid))
			)
			// 5. map each tagId with toold to Tools-Tags table
			async function newToolTag(toolId: string, tagId: string) {
				const toolTagId = generateId("toolTag")
				// check for existence
				const exists = await db.query.toolTags.findFirst({
					where: and(eq(toolTags.toolId, toolId), eq(toolTags.tagId, tagId)),
				})
				if (exists) return
				return await tx.insert(toolTags).values({
					id: toolTagId,
					toolId: createdTool.id,
					tagId: tagId,
				})
			}

			await Promise.all(tagIds.map((tid) => newToolTag(createdTool.id, tid)))
			// 6. Add the creatorid to table if present or create new One
			// later move to creator.ts mutation file

			async function createNewCreator(
				creatorData: InsertCreatorType
			): Promise<string> {
				const creatorExists = await tx.query.creators.findFirst({
					where: eq(creators.name, creatorData.name),
				})
				if (!creatorExists) {
					const newId = generateId("creator")
					await tx.insert(creators).values({
						id: newId,
						name: creatorData.name,
						description: creatorData.description,
						slug: creatorData.slug,
						json: creatorData.json,
						imageUrl: creatorData.imageUrl,
						url: creatorData.url,
					})
					return newId
				}
				return creatorExists.id
			}
			let finalCreatorId: string
			if ("creatorId" in creatorData && creatorData.creatorId) {
				finalCreatorId = creatorData.creatorId
			} else {
				finalCreatorId = await createNewCreator(
					creatorData as InsertCreatorType
				)
			}

			// 7. Insert into toolCreators
			const toolCreatorId = generateId("toolCreator")
			await tx.insert(toolCreators).values({
				id: toolCreatorId,
				toolId: createdTool.id,
				creatorId: finalCreatorId, // now always a string
			})

			return createdTool
		})
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("[createANewTool] Failed to create tool:", error.message)
			console.error(error.stack) // optional, for debugging
		} else {
			console.error("[createANewTool] Unknown error occurred:", error)
		}

		// Optional: throw error to handle higher up
		// throw error
	}
}
