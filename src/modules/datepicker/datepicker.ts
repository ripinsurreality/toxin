;import { Model } from "./Model";
import { View } from "./View";
import { Controller } from "./Controller";
(function ($) {
	$.fn.datepicker = function (
		{ date, multi } = { date: undefined, multi: undefined }
	): JQuery {
		const model = new Model()
		const view = new View()
		const controller = new Controller(model, view, date, multi)

		this.append(controller.render)
		return this
	}
})(jQuery)
