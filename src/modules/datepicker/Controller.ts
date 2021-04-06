import { Dayjs } from "dayjs"
import { Model } from "./Model"
import { View } from "./View"

export class Controller {
	constructor(
		private model: Model,
		private view: View,
		date?: Dayjs,
		multi?: boolean
	) {
		this.model.sub(this)
		this.view.sub(this)

		if (multi) {
			this.model.multi = true
		}

		this.view.flipDate({}, date)
	}

	updateModel(options: any) {
		if (options.type === "getDates") {
			this.view.setDate(options.dates, options.multi)
		}
	}

	updateView(options: any) {
		if (options.type === "setDate") {
			this.model.date = options.date
			return
		}
		if (options.type === "getDates") {
			this.model.getDates()
		}
		if (options.type === "resetDates") {
			this.model.setDates([])
		}
	}

	get render() {
		return this.view.render
	}
}
