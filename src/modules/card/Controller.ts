import { Model, ModelUpdateFunction } from "./Model"
import { View, ViewUpdateFunction } from "./View"

export class Controller {
	constructor(
		private _model: Model,
		private _view: View,
		{ number, price, lux, reviews, images, rating }: CardProps
	) {
		this._model.sub(this)
		this._view.sub(this)

		this._model.number = String(number)
		this._model.priceNumber = price
		this._model.lux = lux
		this._model.reviews = reviews
		if (rating) {
			this._model.rating = rating
		}
		images.forEach((image) => {
			this._model.addImage(image)
		})
	}

	updateModel: ModelUpdateFunction = (options) => {
		switch (options.type) {
			case "image": {
				this._view.addImage(options.image)
				return
			}
			case "lux": {
				this._view.lux = options.lux
				return
			}
			case "number": {
				this._view.number = options.number
				return
			}
			case "price": {
				this._view.price = options.price
				return
			}
			case "reviews": {
				this._view.reviews = options.reviews
				return
			}
			case "rating": {
				this._view.rating = options.rating
				return
			}

			default: {
				return
			}
		}
	}
	updateView: ViewUpdateFunction = (options) => {}

	get render() {
		return this._view.render
	}
}
