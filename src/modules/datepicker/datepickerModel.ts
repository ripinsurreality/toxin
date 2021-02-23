export class DatepickerModel {
	dates: Date[] = []
	lastSetDate: number = 0

	constructor() {}

	resetDates() {
		this.dates = []
	}

	setDate(date: Date) {
		this.dates[this.lastSetDate] = date
		this.lastSetDate = this.lastSetDate === 0 ? 1 : 0
	}
}
