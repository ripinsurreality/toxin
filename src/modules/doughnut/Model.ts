type UpdateDoughnutModelProps =
	| {
			type: "title"
			title: string
	  }
	| {
			type: "item"
			index: number
			value: number
			title: string
			color: string | string[]
	  }

export type UpdateDoughnutModel = (options: UpdateDoughnutModelProps) => void

interface DoughnutModelObserver {
	updateModel: (options: UpdateDoughnutModelProps) => void
}

export class DoughnutModel {
	private _totalName: [string, string, string] = ["", "", ""]
	private _items: DoughnutItem[] = []

	addItem(item: DoughnutObject) {
		const newIndex = this._items.length
		const newItem = new DoughnutItem(item.value, item.color, item.title, newIndex)
		this._items.push(newItem)
		this.updateItem(newIndex)
	}

	get sum() {
		return this._items
			.map((i) => i.value)
			.reduce((prev, curr) => prev + curr)
	}

	setTotalName(totalNames: [string, string, string]) {
		this._totalName = totalNames
		this.update({
			type: "title",
			title: this.title
		})
	}

	get title() {
		return this.getWordForm(this.sum, this._totalName)
	}

	private getWordForm(value: number, forms: [string, string, string]) {
		const cases = [2, 0, 1, 1, 1, 2]
		return forms[
			value % 100 > 4 && value % 100 < 20
				? 2
				: cases[value % 10 < 5 ? value % 10 : 5]
		]
	}

	private updateItem(index: number) {
		if (typeof this._items[index] === "undefined") {
			throw new Error("Model update error: wrong index, item doesn't exist")
		}
		const {color, title, value} = this._items[index]
		this.update({
			type: "item",
			index,
			color,
			title,
			value
		})
	}

	private observers: DoughnutModelObserver[] = []

	sub(o: DoughnutModelObserver) {
		this.observers.push(o)
	}

	unsub(o: DoughnutModelObserver) {
		this.observers.filter((ob) => o !== ob)
	}

	private update: UpdateDoughnutModel = (options) => {
		this.observers.forEach((o) => o.updateModel(options))
	}
}

export class DoughnutItem {
	constructor(private _value: number, private _color: string | string[], private _title: string, private _index: number) {}
	get value() {
		return this._value
	}
	get color() {
		return this._color
	}
	get title() {
		return this._title
	}
}
