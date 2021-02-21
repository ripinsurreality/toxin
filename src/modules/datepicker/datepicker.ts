import { DatepickerView } from "./datepickerView"
import { DatepickerModel } from "./datepickerModel"
;(function ($) {
	$.fn.datepicker = function (): JQuery {
		const model = new DatepickerModel()
		const view = new DatepickerView()
		this.append(view.render())
		return this
	}
})(jQuery)
