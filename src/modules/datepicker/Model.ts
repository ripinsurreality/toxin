import { Dayjs } from "dayjs"

export interface ModelObserver {
	update(model: Model): void
}

export class Model {
	// private dates: Dayjs[] = []
	private lastSetDate: number = 0
	private observers: ModelObserver[] = []

	constructor(private multi?: boolean) {}

	resetDates() {
		this.dates = []
	}

	set date(date: Dayjs) {
		this.dates[this.lastSetDate] = date
		if (this.multi) {
			this.lastSetDate = this.lastSetDate === 0 ? 1 : 0
		}
		this.update()
	}

	set dates(dates: Dayjs[]) {
		if (dates.length === 2) {
			this.dates = dates
			this.update()
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

	sub(o: ModelObserver) {
		this.observers.push(o)
	}

	unsub(o: ModelObserver) {
		this.observers.filter(ob => o !== ob)
	}

	update() {
		this.observers.forEach(o => o.update(this))
	}
}
