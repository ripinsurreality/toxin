export class DropdownModel {
	items: Item[]
	defaultItem: string
	constructor(defaultItem: string, items: ItemType[]) {
		this.items = items.map((item) => new Item(item))
		this.defaultItem = defaultItem
	}

	getItems() {
		return this.items
	}

	getDefaultItem() {
		return this.defaultItem
	}
}

export class Item {
	value: number
	title: string | [string, string, string]
	constructor(item: ItemType) {
		if (typeof item === "string") {
			this.value = 0
			this.title = item.toLowerCase()
		} else if (Array.isArray(item)) {
			this.value = 0
			this.title = [
				item[0].toLowerCase(),
				item[1].toLowerCase(),
				item[2].toLowerCase(),
			]
		} else {
			const i = (item as unknown) as ItemObj
			this.value = i.value
			if (typeof i.title === "string") {
				this.title = i.title
			} else {
				this.title = [
					i.title[0].toLowerCase(),
					i.title[1].toLowerCase(),
					i.title[2].toLowerCase(),
				]
			}
		}
	}

	dispatchValue(type?: "+" | "-") {
		switch (type) {
			case "+": {
				this.value++
				return this.value
			}
			case "-": {
				if (this.value > 0) {
					this.value--
					return this.value
				}
				return
			}

			default: {
				this.value = 0
				return this.value
			}
		}
	}

	getTitle(plural?: boolean) {
		if (typeof this.title === "string") {
			return this.title
		} else if (plural) {
			return this.title[1]
		} else {
			return this.getWordForm()
		}
	}

	getWordForm() {
		const cases = [2, 0, 1, 1, 1, 2]
		return this.title[
			this.value % 100 > 4 && this.value % 100 < 20
				? 2
				: cases[this.value % 10 < 5 ? this.value % 10 : 5]
		]
	}
}
