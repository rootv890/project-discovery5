export const WavyLoader = () => {
	return (
		<svg
			className="absolute top-0 left-0 w-full h-full animate-wave z-0"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<path
				fill="#8B5BFF" // You can also use currentColor or any accent
				d="M0 30 Q 25 50 50 30 T 100 30 V100 H0 Z"
				className="animate-wavePath"
			/>
		</svg>
	)
}
