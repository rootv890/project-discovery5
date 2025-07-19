import React from "react"

type Props = {
	params: Promise<{ categoryId: string }>
}

const CategoryIdPage = async ({ params }: Props) => {
	const { categoryId } = await params
	return <div>Showing {categoryId}</div>
}

export default CategoryIdPage
