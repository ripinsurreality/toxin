import { DropdownModel } from "./dropdownModel"
import { DropdownView } from "./dropdownView"

export class DropdownController {
	private view: DropdownView
	private model: DropdownModel
	private comfortDefault: string = "Какие удобства"
	private comfort: ItemStringType[] = [
		["Спальня", "Спальни", "Спален"],
		["Кровать", "Кровати", "Кроватей"],
		["Ванная комната", "Ванные комнаты", "Ванных комнат"],
	]
	private guestsDefault: string = "Сколько гостей"
	private guestsCollectiveTitle: ItemStringType = ["гость", "гостя", "гостей"]
	private guests: ItemStringType[] = ["Взрослые", "Дети", "Младенцы"]
	private type: "guests" | "comfort"
	constructor({
		view,
		model,
		type,
		values,
	}: {
		view: DropdownView
		model: DropdownModel
		type: "guests" | "comfort"
		values?: number[]
	}) {
		this.view = view
		this.model = model

		this.type = type

		this.view.sub(this)
		this.model.sub(this)

		this.initModel(values)
		this.initView()
	}

	initModel(values?: number[]) {
		const setModelItems = (items: ItemStringType[]) => {
			items.forEach((item, i) => {
				const newItem: ItemType =
					values && values[i]
						? {
								title: item,
								value: values[i],
						  }
						: item
				this.model.addItem(newItem)
			})
		}

		if (this.type === "guests") {
			this.model.defaultItem = this.guestsDefault
			this.model.collectiveTitle = this.guestsCollectiveTitle
			setModelItems(this.guests)
			return
		}

		this.model.defaultItem = this.comfortDefault
		setModelItems(this.comfort)
	}

	initView() {
		this.view.label = this.model.numberOfItems
		this.model.items.forEach((item, i) => {
			this.view.addItem()
			this.view.bottom.items[i].value = item.value
			this.view.bottom.items[i].title = item.getTitle()
		})
		this.type === "guests" && this.view.bottom.initControl()
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
