"use client"
import React from "react"

const BuildLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="h-screen w-screen bg-background">{children}</div>
}

export default BuildLayout
