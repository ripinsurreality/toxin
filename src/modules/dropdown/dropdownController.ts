import { DropdownModel } from "./dropdownModel"
import { DropdownView } from "./dropdownView"

export class DropdownController {
	private view: DropdownView
	private model: DropdownModel
	constructor({
		view,
		model,
		defaultItem,
		items,
	}: {
		view: DropdownView
		model: DropdownModel
		defaultItem: string
		items: ItemType[]
	}) {
		this.view = view
		this.model = model

		this.view.sub(this)
		this.model.sub(this)

		this.initModel(defaultItem, items)
		this.initView()
	}

	initModel(defaultItem: string, items: ItemType[]) {
		this.model.defaultItem = defaultItem
		items.forEach((item) => {
			this.model.addItem(item)
		})
	}

	initView() {
		this.view.label = this.model.numberOfItems
		this.model.items.forEach((item, i) => {
			this.view.addItem()
			this.view.bottom.items[i].value = item.value 
			this.view.bottom.items[i].title = item.getTitle() 
		})
	}

	updateView(options: any) {
		if (options.type === "dispatchValue") {
			this.model.items[options.index].dispatchValue(options.payload)
		}
	}

	updateModel(options: any) {
		if (options.type === "dispatchValue") {
			this.view.bottom.items[options.index].value = options.value
			this.view.bottom.items[options.index].title = options.title
			this.view.label = this.model.numberOfItems
		}
	}

	get render() {
		return this.view.render
	}
}
