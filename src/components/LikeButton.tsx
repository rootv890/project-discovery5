import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Heart } from "iconsax-reactjs"
import { count } from "console"
import { like } from "drizzle-orm"
import { size } from "zod/v4"

const LikeButton = () => {
	// add to DB with optimistic mutation
	const [like, setLike] = useState(false)
	const [count, setCount] = useState(72)

	return (
		<Button
			variant={"ghost"}
			className="w-fit"
			size={"xs"}
			onClick={() => {
				if (!like) {
					setCount((c) => c + 1)
				} else {
					setCount((c) => c - 1)
				}
				setLike(!like)
			}}
		>
			{" "}
			{!like ? (
				/* unliked */ <Heart />
			) : (
				<Heart
					variant="Bold"
					color="#ff6154"
				/>
			)}
			<strong>{count}</strong>
		</Button>
	)
}

export default LikeButton
