import { DoughnutItem } from "./Model"

type UpdateDoughnutViewProps = {}

export type UpdateDoughnutView = (options: UpdateDoughnutViewProps) => void

interface DoughnutViewObserver {
	updateView: (options: UpdateDoughnutViewProps) => void
}

export class DoughnutView {
	body: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	doughnut: Doughnut

	constructor() {
		this.body = document.createElement("canvas")
		this.body.width = 120
		this.body.height = 120
		this.ctx = this.body.getContext("2d") as CanvasRenderingContext2D
		this.doughnut = new Doughnut(this.ctx, this.body.width / 2)
	}

	draw() {
		this.ctx.clearRect(0, 0, this.body.width, this.body.height)
		this.doughnut.draw()
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
		return this.body
	}
}

class Doughnut {
	items: DoughnutPiece[] = []
	min = 0.03
	constructor(
		private ctx: CanvasRenderingContext2D,
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
	}

	private setItem(index: number, percentage: number) {
		const item = this.items[index]
		if (percentage === 0) {
			return
		}
		const radius =this.radius - 5
		const width = 5
		const gap = this.toRadian(5)
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
