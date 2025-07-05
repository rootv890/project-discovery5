import { SidebarProvider } from "@/components/ui/sidebar"
import CatgoriesSidebar from "@/modules/categories/ui/categories-sidebar"
import CategoriesSidebarWrapper from "@/modules/categories/ui/categories-siderbar-wrapper"
import Navbar from "@/modules/navbar/Navbar"

type Props = {
	children?: React.ReactNode
}
const DashboardLayout = ({ children }: Props) => {
	return (
		<SidebarProvider className="flex mt-18 flex-col w-full">
			<Navbar />
			{children}
		</SidebarProvider>
	)
}
export default DashboardLayout
