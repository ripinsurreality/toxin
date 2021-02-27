import { DatepickerView } from "./datepickerView"
import { DatepickerModel } from "./datepickerModel"
import dayjs from "dayjs"
;(function ($) {
	$.fn.datepicker = function (dayjsObj?: dayjs.Dayjs): JQuery {
		const model = new DatepickerModel()
		const view = new DatepickerView(dayjsObj, model)
		this.append(view.render())
		return this
	}
})(jQuery)
