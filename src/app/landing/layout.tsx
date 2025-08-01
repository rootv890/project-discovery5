import MenuSidebar from "@/modules/marketing/marketing-menu-bar"
import MarketingNavbar from "@/modules/marketing/marketing-navbar"
import React from "react"

const pinkPurpleGradient = [
	"#A662FF", // Electric Lavender
	"#FF5EDB", // Neon Pink
	"#C75CFF", // Soft Purple
	"#FF8AE2", // Light Bubblegum Pink
	"#AA6BFF", // Vivid Violet
	"#FF98BA", // Light Rosy Pink
]

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full w-full relative">
			<MarketingNavbar />
			<MenuSidebar />
			{children}
		</div>
	)
}

export default layout
