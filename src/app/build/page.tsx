import { Button } from "@/components/ui/button"
import { Google } from "iconsax-reactjs"
import { Loader2 } from "lucide-react"

const BuildPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full w-full gap-2">
			<Button
				size="sm"
				variant={"filled"}
				borderType="square"
			>
				Small Corner (12px)
			</Button>
			<Button
				size="md"
				variant={"ghost"}
				borderType="square"
			>
				Medium Corner (16px)
			</Button>
			<Button
				size="lg"
				variant={"outline"}
				borderType="square"
			>
				Large Corner (28px)
			</Button>
			<Button
				size="xl"
				variant={"tonal"}
				borderType="square"
			>
				XL Corner (28px)
			</Button>
		</div>
	)
}

export default BuildPage
