import { Model } from "./Model"
import { View } from "./View"
import { Controller } from "./Controller"
import "./_datepicker.sass"

;(function ($) {
	$.fn.datepicker = function (props?: DatepickerProps) {
		const model = new Model()
		const view = new View()
		const controller = new Controller(
			model,
			view,
			props?.date,
			props?.multi
		)

		this.append(controller.render)
		return this
	}
})(jQuery)
