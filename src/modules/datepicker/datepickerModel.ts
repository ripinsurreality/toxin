import { Dayjs } from "dayjs"

export class DatepickerModel {
	dates: Dayjs[] = []
	lastSetDate: number = 0

	constructor() {}

	resetDates() {
		this.dates = []
	}

	setDate(date: Dayjs) {
		this.dates[this.lastSetDate] = date
		this.lastSetDate = this.lastSetDate === 0 ? 1 : 0
	}
}
