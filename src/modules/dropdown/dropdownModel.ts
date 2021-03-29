export interface ModelObserver {
	updateModel(options: any): void
}

export class DropdownModel {
	constructor() {}

	defaultItem: string = ""
	collectiveTitle?: ItemStringType
	items: Item[] = []

	addItem(item: ItemType) {
		const newItem = new Item(
			item,
			this.items.length,
			this.update,
			this.getWordForm
		)
		this.items.push(newItem)
	}

	getCollectiveTitle(value: number) {
		return (
			this.collectiveTitle &&
			this.getWordForm(this.collectiveTitle, value)
		)
	}

	get numberOfItems() {
		if (this.collectiveTitle) {
			const sum = this.items
				.map((item) => item.value)
				.reduce((prev: number, curr: number) => prev + curr)
			return sum > 0 ? `${sum} ${this.getCollectiveTitle(sum)}` : this.defaultItem
		}
		return (
			this.items
				.map((item) => {
					if (item.value === 0) {
						return ""
					}
					return `${item.value} ${item.getTitle()}`
				})
				.filter((item) => {
					if (item) return item
				})
				.join(", ") || this.defaultItem
		)
	}

	private getWordForm(titles: ItemStringType, value: number) {
		const cases = [2, 0, 1, 1, 1, 2]
		return titles[
			value % 100 > 4 && value % 100 < 20
				? 2
				: cases[value % 10 < 5 ? value % 10 : 5]
		]
	}

	private observers: ModelObserver[] = []

	sub(o: ModelObserver) {
		this.observers.push(o)
	}

	unsub(o: ModelObserver) {
		this.observers.filter((ob) => o !== ob)
	}

	update = (options: any) => {
		this.observers.forEach((o) => o.updateModel(options))
	}
}

export class Item {
	value: number = 0
	title: ItemStringType = ""
	constructor(
		item: ItemType,
		private index: number,
		private update: (options: any) => void,
		private getWordForm: (titles: ItemStringType, value: number) => string
	) {
		this.init(item)
	}

	init(item: ItemType) {
		if (typeof item === "string" || Array.isArray(item)) {
			this.setTitle(item)
			return
		}
		this.value = item.value < 0 ? 0 : item.value
		this.setTitle(item.title)
	}

	setTitle(t: ItemStringType) {
		if (typeof t === "string") {
			this.title = t.toLowerCase()
			return
		}
		this.title = [
			t[0].toLowerCase(),
			t[1].toLowerCase(),
			t[2].toLowerCase(),
		]
	}

	dispatchValue(type?: "+" | "-") {
		let newValue: number
		switch (type) {
			case "+": {
				newValue = this.value + 1
				break
			}
			case "-": {
				newValue = this.value
				if (this.value > 0) {
					newValue = this.value - 1
				}
				break
			}
			default: {
				newValue = 0
				break
			}
		}

		if (newValue !== this.value) {
			this.value = newValue
			this.update({
				type: "dispatchValue",
				value: this.value,
				index: this.index,
				title: this.getTitle(),
			})
		}
	}

	getTitle(plural?: boolean) {
		if (typeof this.title === "string") {
			return this.title
		}
		if (plural) {
			return this.title[1]
		}
		return this.getWordForm(this.title, this.value)
	}
}
