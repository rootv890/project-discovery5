import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { TRPCReactProvider } from "@/trpc/client"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "react-hot-toast"
import "./globals.css"
const geist = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
})

export const metadata: Metadata = {
	title: "Discovery5",
	description: "Discover the world of open source projects",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<TRPCReactProvider>
				<body className={`${geist.className} antialiased`}>
					<ThemeProvider
						attribute={"class"}
						defaultTheme="system"
						enableSystem={false}
						disableTransitionOnChange
					>
						<NuqsAdapter>
							<Toaster
								position="top-right"
								reverseOrder={false}
								toastOptions={{
									style: {
										backgroundColor: "var(--primary-container)",
										color: "var(--on-primary-container)",
										borderRadius: "var(--radius)",
									},
									success: {
										style: {
											backgroundColor: "var(--success)",
											color: "var(--on-success)",
										},
									},
									error: {
										style: {
											backgroundColor: "var(--error)",
											color: "var(--on-tertiary)",
										},
									},
								}}
							/>

							{children}
						</NuqsAdapter>
					</ThemeProvider>
				</body>
			</TRPCReactProvider>
		</html>
	)
}
