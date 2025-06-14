"use client"
import React from "react"
import AnimatedBackground from "@/components/AnimatedBackground"

const BuildLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="h-screen w-screen bg-amber-50">{children}</div>
}

export default BuildLayout
