import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { XIcon } from "lucide-react"
import React from "react"
import toast, { Toast } from "react-hot-toast"

type ToastProps = {
	t: Toast
	children: React.ReactNode
	hasCloseIcon?: boolean
	className?: string
	variant?: "default" | "destructive" | "success" | "warning" | "info"
}

const toastVariants = cva(`relative px-4 py-2`, {
	variants: {
		variant: {
			default: "bg-primary-container text-primary-foreground",
			destructive: "bg-destructive text-destructive-foreground",
			success: "bg-success text-success-foreground",
			warning: "bg-warning text-warning-foreground",
			info: "bg-info text-info-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

const ToastMessage = ({
	t,
	children,
	hasCloseIcon = true,
	className,
	variant = "default",
}: ToastProps) => {
	return (
		<div className={cn(toastVariants({ variant }), className)}>
			{t.id}
			{children}
			{hasCloseIcon && (
				<button
					className="absolute right-0 top-0 cursor-pointer"
					onClick={() => {
						toast.dismiss(t.id)
					}}
				>
					<XIcon />
				</button>
			)}
		</div>
	)
}

export default ToastMessage
