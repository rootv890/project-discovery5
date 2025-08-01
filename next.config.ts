import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	allowedDevOrigins: ["http://192.168.1.6:3000"],
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "cdn.sanity.io",
			},
		],
	},
}

export default nextConfig
