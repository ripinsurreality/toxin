import { DropdownView } from "./dropdownView"
import { DropdownModel } from "./dropdownModel"
import { DropdownController } from "./dropdownController"
import "./dropdown.sass"

;(function ($) {
	$.fn.dropdown = function (type, values) {
		const model = new DropdownModel()
		const view = new DropdownView()
		const controller = new DropdownController({
			model,
			view,
			type,
			values,
		})
		this.append(controller.render)
		return this
	}
})(jQuery)
