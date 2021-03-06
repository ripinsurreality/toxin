import { Model, ModelObserver } from "./Model"
import { View } from "./View"

class Controller implements ModelObserver {
	constructor(model: Model, view: View) {
		model.sub(this)
	}

	update(model: Model) {
		
	}
}
