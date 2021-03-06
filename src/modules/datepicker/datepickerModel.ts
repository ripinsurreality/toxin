import { Dayjs } from "dayjs"

export class DatepickerModel {
	dates: Dayjs[] = []
	lastSetDate: number = 0

	constructor(private multi?: boolean) {}

	resetDates() {
		this.dates = []
	}

	setDate(date: Dayjs) {
		this.dates[this.lastSetDate] = date
		if (this.multi) {
			this.lastSetDate = this.lastSetDate === 0 ? 1 : 0
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
}
