import { DropdownView } from "./dropdownView"
import { DropdownModel } from "./dropdownModel"
;(function ($) {
	$.fn.dropdown = function (defaultItem: string, ...items: ItemType[]): JQuery {
		const model = new DropdownModel(defaultItem, items)
		const view = new DropdownView(model.getDefaultItem(), model.getItems())
		this.append(view.render())
		return this
	}
})(jQuery)
