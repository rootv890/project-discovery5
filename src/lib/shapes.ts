// Shape utility functions and constants
export const SHAPE_CATEGORIES = {
	organic: [
		"4-leaf-clover.svg",
		"Flower.svg",
		"Heart.svg",
		"Burst.svg",
		"Puffy.svg",
	],
	geometric: [
		"Diamond.svg",
		"Hexagon.svg",
		"Pentagon.svg",
		"Square.svg",
		"Triangle.svg",
	],
	expressive: [
		"Sunny.svg",
		"Very-sunny.svg",
		"Fan.svg",
		"Boom.svg",
		"Soft-boom.svg",
	],
	playful: [
		"Ghost-ish.svg",
		"Pixel-Circle.svg",
		"Pixel-triangle.svg",
		"Bun.svg",
	],
	elegant: ["Gem.svg", "Puffy-diamond.svg", "Oval.svg", "Pill.svg", "Arch.svg"],
} as const

export const ALL_SHAPES = [
	"12-sided-cookie.svg",
	"4-leaf-clover.svg",
	"4-sided-cookie.svg",
	"6-sided-cookie.svg",
	"7-sided-cookie.svg",
	"8-leaf-clover.svg",
	"9-sided-cookie.svg",
	"Arch.svg",
	"Arrow.svg",
	"Boom.svg",
	"Bun.svg",
	"Burst.svg",
	"Circle.svg",
	"Diamond.svg",
	"Fan.svg",
	"Flower.svg",
	"Gem.svg",
	"Ghost-ish.svg",
	"Heart.svg",
	"Hexagon.svg",
	"Oval.svg",
	"Pentagon.svg",
	"Pill.svg",
	"Pixel-Circle.svg",
	"Pixel-triangle.svg",
	"Puffy-diamond.svg",
	"Puffy.svg",
	"Semicircle.svg",
	"Slanted.svg",
	"Soft-boom.svg",
	"Soft-burst.svg",
	"Square.svg",
	"Sunny.svg",
	"Triangle.svg",
	"Very-sunny.svg",
] as const

// Get random shape from category
export const getRandomShapeFromCategory = (
	category: keyof typeof SHAPE_CATEGORIES
) => {
	const shapes = SHAPE_CATEGORIES[category]
	return shapes[Math.floor(Math.random() * shapes.length)]
}

// Get shape based on user status/mood
export const getContextualShape = (userStatus: {
	isNewUser: boolean
	isVerified: boolean
	hasImage: boolean
}) => {
	if (userStatus.isNewUser) return getRandomShapeFromCategory("playful")
	if (userStatus.isVerified) return getRandomShapeFromCategory("elegant")
	return getRandomShapeFromCategory("organic")
}

// GSAP animation variations
export const ANIMATION_PRESETS = {
	gentle: { rotation: 45, duration: 0.6, ease: "power1.out" },
	dramatic: { rotation: 180, duration: 0.8, ease: "power2.out" },
	bouncy: { rotation: 90, duration: 1.2, ease: "bounce.out" },
	elastic: { rotation: 135, duration: 1.0, ease: "elastic.out(1, 0.3)" },
	spin: { rotation: 360, duration: 1.5, ease: "power2.inOut", repeat: -1 },
}
