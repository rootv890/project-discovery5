"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const MarketingSearchBar = () => {
	const [query, setQuery] = useState("")
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!query.trim()) return
		router.push(`/search?q=${encodeURIComponent(query.trim())}`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			role="search"
			aria-label="Search courses, topics, or creators"
			className="w-full z-10 max-w-xl mx-auto flex items-center gap-2"
		>
			<div className="flex items-center w-full h-[52px] px-6 py-3 bg-white rounded-full shadow-sm gap-2">
				<SearchIcon
					className="w-5 h-5 text-gray-400"
					aria-hidden="true"
				/>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					id="search-input"
					placeholder="Search any Course, topic, creator"
					className="w-full bg-transparent focus:outline-none text-base placeholder:text-gray-400 text-primary"
					aria-label="Search input"
				/>
			</div>
			<button
				type="submit"
				className="h-[52px] px-8 cursor-pointer  bg-[#EDE2FF] text-black rounded-full text-sm font-medium transition hover:bg-[#decaff]"
			>
				Search
			</button>
		</form>
	)
}

export default MarketingSearchBar
