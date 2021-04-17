interface DoughnutObject {
	value: number
	color: string | string[]
	title: string
}

type DoughnutProps = DoughnutObject[]

interface JQuery {
	doughnut(props: DoughnutProps): JQuery
}