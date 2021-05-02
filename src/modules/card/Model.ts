interface ModelObserver {
	updateModel: ModelUpdateFunction
}

type ModelUpdateFunctionProps = {}

export type ModelUpdateFunction = (options: ModelUpdateFunctionProps) => void

export class Model {
	_number: string
	_price: number
	_lux: boolean
	_reviews: number
	_image: string

	set number(number: string) {
		this._number = number
	}

	get number() {
		return this._number
	}

	set price(price: number | string) {
		if (typeof price === "string") {
			price = parseInt(price, 10)
		}
		this._price = price
	}

	get price() {
		return String(this._price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
	}

	set lux(lux: boolean) {
		this._lux = lux
	}

	set reviews(reviews: number) {
		this._reviews = reviews
	}

	set image(image: string) {
		this._image = image
	}

	private observers: ModelObserver[] = []

	sub(o: ModelObserver) {
		this.observers.push(o)
	}

	unsub(o: ModelObserver) {
		this.observers.filter(ob => o !== ob)
	}

	update: ModelUpdateFunction = (options) => {
		this.observers.forEach(o => o.updateModel(options))
	}
}