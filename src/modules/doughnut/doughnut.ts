import { DoughnutController } from "./Controller";
import { DoughnutModel } from "./Model";
import { DoughnutView } from "./View"
import "./doughnut.sass"

;(function ($) {
	$.fn.doughnut = function (items: DoughnutObject[]) {
		const view = new DoughnutView()
		const model = new DoughnutModel()
		const controller = new DoughnutController(model, view, items)
		this.append(view.render)
		return this
	}
})(jQuery)
