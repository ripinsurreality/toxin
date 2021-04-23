import { DoughnutModel, UpdateDoughnutModel } from "./Model"
import { DoughnutView, UpdateDoughnutView } from "./View"

export class DoughnutController {
	constructor(
		private model: DoughnutModel,
		private view: DoughnutView,
		items: DoughnutObject[]
	) {
		this.model.sub(this)
		this.view.sub(this)

		this.model.setTotalName(["голос", "голоса", "голосов"])

		items.forEach((item) => {
			this.model.addItem(item)
		})
	}

	updateModel: UpdateDoughnutModel = (options) => {
		if (options.type === "title") {
		}
		if (options.type === "item") {
			this.view.doughnut.addItem(
				options.index,
				options.value,
				options.title,
				options.color,
				this.model.sum
			)
			this.view.list.addItem(options.title, options.color)
			this.view.number.title = this.model.title
			this.view.number.number = String(this.model.sum)
		}
	}

	updateView: UpdateDoughnutView = (options) => {
		if (options.type === "view") {
			this.view.draw()
		}
	}
}
