import { Dayjs } from "dayjs"
import { Model } from "./Model"
import { View } from "./View"

export class Controller {
	constructor(private model: Model, private view: View, date?: Dayjs, multi?: boolean) {
		this.model.sub(this)
		this.view.sub(this)

		this.view.flipDate({}, date)

		if (multi) {
			this.model.multi = true
		}
	}

	updateModel(options: any) {
		if (options.type === "setDates") {
			this.view.setDate(options.dates)
		}
	}

	updateView(options: any) {
		if (options.type === "setDate") {
			this.model.date = options.date
			return
		}
		if (options.type === "getDates") {
			this.view.setDate(this.model.dates)
		}
		
	}

	get render() {
		return this.view.render
	}
}
