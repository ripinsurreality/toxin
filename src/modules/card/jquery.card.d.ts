interface CardProps {
	number: string | number
	price: number
	lux?: boolean
	reviews: number
	rating?: Rating
	images: string[]
}

type Rating = 1 | 2 | 3 | 4 | 5 | undefined

interface JQuery {
	card(props: CardProps): JQuery
}