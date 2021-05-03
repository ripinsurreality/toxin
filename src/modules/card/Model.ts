interface ModelObserver {
	updateModel: ModelUpdateFunction
}

type ModelUpdateFunctionProps = {
	type: "number"
	number: string
} | {
	type: "price"
	price: string
} | {
	type: "lux"
	lux: boolean
} | {
	type: "reviews"
	reviews: number
} | {
	type: "image"
	image: string
}

export type ModelUpdateFunction = (options: ModelUpdateFunctionProps) => void

export class Model {
	private _number: string = ""
	private _price: number = 0
	private _lux: boolean = false
	private _reviews: number = 0
	private _images: string[] = []

	set number(number: string) {
		this._number = number
		this.update({
			type: "number",
			number: this._number
		})
	}

	set priceNumber(price: number | string) {
		if (typeof price === "string") {
			price = parseInt(price, 10)
		}
		this._price = price
		this.update({
			type: "price",
			price: this.price
		})
	}

	set lux(lux: boolean | undefined) {
		if (typeof lux === "undefined") {
			lux = false
		}
		this._lux = lux
		this.update({
			type: "lux",
			lux: this._lux
		})
	}

	set reviews(reviews: number) {
		this._reviews = reviews
		this.update({
			type: "reviews",
			reviews: this._reviews
		})
	}

	addImage(image: string) {
		this._images.push(image)
		this.update({
			type: "image",
			image
		})
	}

	get price(): string {
		return String(this._price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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