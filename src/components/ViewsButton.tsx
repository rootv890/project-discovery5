import React from "react"
import { Button } from "./ui/button"
import { Eye } from "iconsax-reactjs"
import QuickTooltip from "./QuickToolTip"

const ViewsButton = () => {
	const [views, setViews] = React.useState(72)

	return (
		<QuickTooltip label={"click to like the product"}>
			<Button
				variant="ghost"
				size="xs"
				className="gap-1"
				disabled
			>
				<Eye
					className="text-muted-foreground"
					size={16}
				/>
				<strong>{views}</strong>
			</Button>
		</QuickTooltip>
	)
}

export default ViewsButton
