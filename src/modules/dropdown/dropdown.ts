import { DropdownView } from "./dropdownView"
import { DropdownModel } from "./dropdownModel"
import { DropdownController } from "./dropdownController"
;(function ($) {
	$.fn.dropdown = function (
		defaultItem: string,
		...items: ItemType[]
	): JQuery {
		const model = new DropdownModel()
		const view = new DropdownView()
		const controller = new DropdownController({
			model,
			view,
			defaultItem,
			items,
		})
		this.append(controller.render)
		return this
	}
})(jQuery)
