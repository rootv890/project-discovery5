"use client"
import AnimatedBackground from "@/components/AnimatedBackground"
import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return <AnimatedBackground>{children}</AnimatedBackground>
}

export default AuthLayout
