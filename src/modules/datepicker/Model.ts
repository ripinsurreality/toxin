import { Dayjs } from "dayjs"

interface ModelObserver {
	updateModel(options: any): void
}

export class Model {
	dates: Dayjs[] = []
	private lastSetDate: number = 0
	multi: boolean = false

	constructor() {}

	resetDates() {
		this.dates = []
	}

	set date(date: Dayjs) {
		if (this.multi) {
			this.dates[this.lastSetDate] = date
			this.lastSetDate = this.lastSetDate === 0 ? 1 : 0
			this.getDates()
			return
		}
		this.dates[0] = date
		this.getDates()
	}

	getDates() {
		this.update({
			type: "getDates",
			dates: this.dates,
			multi: this.multi
		})
	}

	setDates(dates: Dayjs[]) {
		if (dates.length === 2) {
			this.dates = dates
			this.getDates()
		} else {
			throw new Error("dates should be an array of 2 Dayjs objects")
		}
	}

	get firstDate() {
		return this.dates.filter(
			(i) =>
				i.valueOf() ===
				Math.min(...this.dates.map((date) => date.valueOf()))
		)[0]
	}

	get lastDate() {
		return this.dates.filter(
			(i) =>
				i.valueOf() ===
				Math.max(...this.dates.map((date) => date.valueOf()))
		)[0]
	}
	
	private observers: ModelObserver[] = []

	sub(o: ModelObserver) {
		this.observers.push(o)
	}

	unsub(o: ModelObserver) {
		this.observers.filter(ob => o !== ob)
	}

	update(options: any) {
		this.observers.forEach(o => o.updateModel(options))
	}
}
