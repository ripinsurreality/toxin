interface CardProps {
	number: string
	price: number
	lux?: boolean
	reviews: number
	images: string[]
}

interface JQuery {
	card(props: CardProps): JQuery
}