import { DatepickerView } from "./datepickerView"
import { DatepickerModel } from "./datepickerModel"
;(function ($) {
	$.fn.datepicker = function (date = new Date()): JQuery {
		const model = new DatepickerModel()
		const view = new DatepickerView(date, model)
		this.append(view.render())
		return this
	}
})(jQuery)
