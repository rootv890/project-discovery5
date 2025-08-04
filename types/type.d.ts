export type ProductCardProps = React.ComponentProps<typeof Card> & {
	variant?: "elevated" | "filled" | "outlined"
	imageSrc: string
	imageAlt?: string
	title: string
	subtitle?: string
	description?: React.ReactNode | string
	visitUrl?: string
	moreInfoUrl?: string
}
