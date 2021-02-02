
interface Thumb {
	value: number
}

interface SliderOptions {
	min: number
	max: number
	step: number
	thumbs?: Thumb[]
}

interface JQuery {
	slider(options: SliderOptions): JQuery
}