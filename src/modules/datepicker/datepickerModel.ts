export class DatepickerModel {
	firstDate?: Date
	lastDate?: Date

	constructor() {}

	resetDates() {
		this.firstDate = undefined
		this.lastDate = undefined
	}

	setFirstDate(date: Date) {
		this.firstDate = new Date(date.getTime())
	}

	setLastDate(date: Date) {
		this.lastDate = new Date(date.getTime())
	}
}
