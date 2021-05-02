interface ViewObserver {
	updateView: ViewUpdateFunction
}

type ViewUpdateFunctionProps = {}

export type ViewUpdateFunction = (options: ViewUpdateFunctionProps) => void

export class View {
	private $body: JQuery
	private _images: Images
	private _label: Label

	constructor() {
		this.$body = $(`<div class="card"></div>`)
		this._images = new Images()
		this._label = new Label()

		this.$body.append(this._images.render, this._label.render)
	}

	addImage(image: string) {
		this._images.addImage(image)
	}

	setImage(index: number) {
		this._images.setImage(index)
	}

	private observers: ViewObserver[] = []

	sub(o: ViewObserver) {
		this.observers.push(o)
	}

	unsub(o: ViewObserver) {
		this.observers.filter(ob => o !== ob)
	}

	update: ViewUpdateFunction = (options) => {
		this.observers.forEach(o => o.updateView(options))
	}

	get render() {
		return this.$body
	}
}

class Images {
	private $body: JQuery
	private $image: JQuery
	private _arrows: Arrows
	private _images: string[] = []
	private _currentImageIndex: number = 0
	private _balls: Balls

	constructor() {
		this.$body = $(`<div class="card__images"></div>`)
		this.$image = $(`<img class="card__image" alt="room image"></img>`)
		this._arrows = new Arrows()
		this._balls = new Balls()

		this.$body.append(this.$image, this._arrows.render, this._balls.render)
	}

	addImage(image: string) {
		if (this._images.length === 4) {
			return
		}
		this._images.push(image)
		this._balls.addBall()
	}

	setImage(index: number) {
		this._currentImageIndex = index > this._images.length - 1 ? 0 : index
		this.resetImage()
	}

	private resetImage() {
		this.$image.attr("src", `@img/${this._images[this._currentImageIndex]}.png`)
	}

	get render() {
		return this.$body
	}
}

class Arrows {
	$body: JQuery
	$arrowWrapperLeft: JQuery
	$arrowWrapperRight: JQuery
	$arrowLeft: JQuery
	$arrowRight: JQuery

	constructor() {
		this.$body = $(`<div class="card__arrows"></div>`)
		this.$arrowWrapperLeft = $(
			`<div class="card__arrow-wrapper-left"></div>`
		)
		this.$arrowLeft = $(`<div class="card__arrow-left">expand_more</div>`)
		this.$arrowWrapperRight = $(
			`<div class="card__arrow-wrapper-right"></div>`
		)
		this.$arrowRight = $(`<div class="card__arrow-right">expand_more</div>`)
	}

	get render() {
		return this.$body
	}
}

class Balls {
	private $body: JQuery
	readonly _balls: Ball[] = []

	constructor() {
		this.$body = $(`<div class="card__balls"></div>`)
	}

	addBall() {
		const newBall = new Ball()
		this._balls.push(newBall)
		this.$body.append(newBall.render)
	}

	get render() {
		return this.$body
	}
}

class Ball {
	$body: JQuery
	private _current: boolean = false

	constructor() {
		this.$body = $(`<div class="card__ball"></div>`)
	}

	set current(current: boolean) {
		this._current = current

		if (this._current) {
			this.$body.addClass("card__ball--full")
			return
		}
		this.$body.removeClass("card__ball--full")
	}

	get render() {
		return this.$body
	}
}

class Label {
	$body: JQuery
	$top: JQuery
	$title: JQuery
	$number: JQuery
	$lux: JQuery
	$price: JQuery

	$bottom: JQuery
	// rating: Rating
	$reviews: JQuery

	constructor() {
		this.$body = $(`<div class="card__label"></div>`)
		this.$top = $(`<div class="card__label-top"></div>`)
		this.$title = $(`<div class="card__title">№&nbsp;</div>`)
		this.$number = $(`<div class="card__number"></div>`)
		this.$lux = $(`<div class="card__lux"></div>`)
		this.$price = $(`<div class="card__price"></div>`)

		this.$bottom = $(`<div class="card__label-bottom"></div>`)
		this.$reviews = $(`<div class="card__reviews"></div>`)

		this.$body.append(
			this.$top.append(
				this.$title.append(this.$number, this.$lux),
				this.$price
			),
			this.$bottom.append(this.$reviews)
		)
	}

	get render() {
		return this.$body
	}
}
