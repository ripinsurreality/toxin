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
			this.view.draw()
		}
	}

	updateView: UpdateDoughnutView = (options) => {}
}
