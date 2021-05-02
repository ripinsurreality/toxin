import { Model, ModelUpdateFunction } from "./Model"
import { View, ViewUpdateFunction } from "./View"

class Controller {
	constructor(private _model: Model, private _view: View) {
		this._model.sub(this)
		this._view.sub(this)
	}

	updateModel: ModelUpdateFunction = (options) => {}
	updateView: ViewUpdateFunction = (options) => {}
}
