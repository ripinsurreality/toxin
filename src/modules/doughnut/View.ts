import { DoughnutItem } from "./Model"

type UpdateDoughnutViewProps = {
	type: string
}

export type UpdateDoughnutView = (options: UpdateDoughnutViewProps) => void

interface DoughnutViewObserver {
	updateView: (options: UpdateDoughnutViewProps) => void
}

export class DoughnutView {
	$body: JQuery
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	doughnut: Doughnut
	number: DoughnutNumber
	list: DoughnutList

	constructor() {
		this.$body = $(`<div class="doughnut"></div>`)
		this.canvas = document.createElement("canvas")
		this.canvas.width = 120
		this.canvas.height = 120
		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
		this.doughnut = new Doughnut(this.ctx, this.update, this.canvas.width / 2)
		this.number = new DoughnutNumber(this.ctx, this.update)
		this.list = new DoughnutList()

		this.$body.append(this.canvas, this.list.render)
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.doughnut.draw()
		this.number.draw()
	}

	private observers: DoughnutViewObserver[] = []

	sub(o: DoughnutViewObserver) {
		this.observers.push(o)
	}

	unsub(o: DoughnutViewObserver) {
		this.observers.filter((ob) => o !== ob)
	}

	update: UpdateDoughnutView = (options) => {
		this.observers.forEach((o) => o.updateView(options))
	}

	get render() {
		return this.$body
	}
}

class Doughnut {
	items: DoughnutPiece[] = []
	min = 0.03
	constructor(
		private ctx: CanvasRenderingContext2D,
		private update: UpdateDoughnutView,
		private radius: number
	) {}

	private setItems(sum: number) {
		const acc: number[] = [0]
		const percentages = this.items.map((item, i) => item.value / sum)
		percentages.forEach((p, i) => {
			if (p === 0 || p > this.min) {
				return
			}
			acc.push(this.min - p)
			percentages[i] = this.min
		})
		const accSum = acc.reduce(
			(prev, curr) =>
				prev + curr / (percentages.length - (acc.length - 1))
		)
		percentages.forEach((p, i) => {
			const percent = p > this.min ? p - accSum : p
			this.setItem(i, percent)
		})
	}

	addItem(index: number, value: number, title: string, color: string | string[], sum: number) {
		const newItem = new DoughnutPiece(this.ctx, value, title)
		newItem.radius = this.radius
		newItem.color = color
		this.items[index] = newItem
		this.setItems(sum)
		this.update({type: "view"})
	}

	private setItem(index: number, percentage: number) {
		const item = this.items[index]
		if (percentage === 0) {
			return
		}
		const radius =this.radius - 5
		const width = 4
		const gap = this.toRadian(1)
		const angle = percentage * 2 * Math.PI - gap
		const lastAngle =
			typeof this.items[index - 1] === "undefined"
				? this.toRadian(90)
				: this.items[index - 1].endAngle + gap
		const startAngle = lastAngle
		const endAngle = angle + lastAngle
		const x = this.radius
		const y = this.radius
		item.setBody(x, y, radius, startAngle, endAngle, width)
	}

	private toRadian(angle: number) {
		return (Math.PI / 180) * angle
	}

	draw() {
		this.items.forEach((item) => {
			item.draw()
		})
	}
}

class DoughnutPiece {
	private _x: number = 0
	private _y: number = 0
	private _radius: number = 0
	private _startAngle: number = 0
	private _endAngle: number = 0
	private _color: string | CanvasGradient = ""
	private _width: number = 0

	constructor(private ctx: CanvasRenderingContext2D, private _value: number, private _title: string) {}

	setBody(x: number, y: number, radius: number, startAngle: number, endAngle: number, width: number) {
		this._x = x
		this._y = y
		this._radius = radius
		this._startAngle = startAngle
		this._endAngle = endAngle
		this._width = width
	}

	get value() {
		return this._value
	}

	get endAngle() {
		return this._endAngle
	}

	set radius(r: number) {
		this._radius = r
	}

	set color(c: string | string[]) {
		if (Array.isArray(c)) {
			const gradient = this.ctx.createLinearGradient(
				this._radius,
				0,
				this._radius,
				this._radius * 2
			)
			c.forEach((color, i) =>
				gradient.addColorStop(i / (color.length - 1), color)
			)
			this._color = gradient
			return
		}
		this._color = c
	}

	draw() {
		this.ctx.beginPath()
		this.ctx.arc(
			this._x,
			this._y,
			this._radius,
			this._startAngle,
			this._endAngle
		)
		this.ctx.strokeStyle = this._color
		this.ctx.lineWidth = this._width
		this.ctx.stroke()
	}
}

class DoughnutNumber {
	private _number: string = "260"
	private _title: string = "ГОЛОСОВ" 
	private _numberFont: string = "700 24px Montserrat"
	private _titleFont: string = "700 12px Montserrat"
	private _color: string = "#BC9CFF"
	private _x: number = 60
	private _y: number = 40
	
	constructor(private ctx: CanvasRenderingContext2D, private update: UpdateDoughnutView) {}

	set number(number: string) {
		this._number = number
		this.update({
			type: "view"
		})
	}

	set title(title: string) {
		this._title = title.toUpperCase()
		this.update({
			type: "view"
		})
	}

	draw() {
		this.ctx.font = this._numberFont
		this.ctx.fillStyle = this._color
		this.ctx.textBaseline = "top"
		const width = this.ctx.measureText(this._number).width
		this.ctx.fillText(this._number, this._x - (width / 2), this._y)
		this.ctx.font = this._titleFont
		const width2 = this.ctx.measureText(this._title).width
		this.ctx.fillText(this._title, this._x - (width2 / 2), this._y + 30, 120)
	}
}

class DoughnutList {
	$body: JQuery
	_items: DoughnutListItem[] = []

	constructor() {
		this.$body = $(`<ul class="doughnut__list"></ul>`)
	}

	addItem(title: string, color: string | string[]) {
		this._items.push(new DoughnutListItem(title, color))
		this.$body.append(this._items.map(item => item.render))
	}

	get render() {
		return this.$body
	}
}

class DoughnutListItem {
	$body: JQuery
	$color: JQuery

	constructor(private _title: string, private _color: string | string[]) {
		this.$body = $(`<li class="doughnut__item"></li>`)
		this.$body.text(this._title)
		this.$color = $(`<div class="doughnut__color"></div>`)
		this.$color.css("background", typeof this._color === "string" ? this._color : `linear-gradient(${this._color.join()})`)

		this.$body.prepend(this.$color)
	}

	get render() {
		return this.$body
	}
}