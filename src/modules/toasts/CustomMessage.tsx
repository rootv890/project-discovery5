import { XIcon } from "lucide-react"
import React from "react"
import toast, { Toast } from "react-hot-toast"

const CustomMessage = (
	t: Toast,
	data: {
		tool: string
	}
) => {
	return (
		<div className="">
			you have selected <b>{data.tool}</b>
			<button
				className="cursor-pointer"
				onClick={() => {
					toast.dismiss(t.id)
				}}
			>
				<XIcon />
			</button>
		</div>
	)
}

export default CustomMessage
