import { DatepickerView } from "./datepickerView"
import { DatepickerModel } from "./datepickerModel"
import dayjs from "dayjs"
;(function ($) {
	$.fn.datepicker = function (
		{ date, multi } = { date: undefined, multi: undefined }
	): JQuery {
		const model = new DatepickerModel(multi)
		const view = new DatepickerView(
			date ? (date as dayjs.Dayjs) : undefined,
			model,
			multi
		)
		this.append(view.render())
		return this
	}
})(jQuery)
