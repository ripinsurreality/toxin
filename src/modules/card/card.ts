import { Model } from "./Model"
import { View } from "./View"
import { Controller } from "./Controller"
import "./_card.sass"

;(function ($) {
	$.fn.card = function (props: CardProps) {
		const model = new Model()
		const view = new View()
		const controller = new Controller(
			model,
			view,
			props
		)

		this.append(controller.render)
		return this
	}
})(jQuery)
