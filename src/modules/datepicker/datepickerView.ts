export class DatepickerView {
	$body: JQuery
	nav: DatepickerNav
	main: DatepickerMain
	// control: DatepickerControl
	currDate: Date

	constructor(date = new Date()) {
		this.currDate = date
		this.$body = $(`<div class="datepicker"></div>`)
		const flipMonth = (months: number) => {
			this.currDate.setMonth(this.currDate.getMonth() + months)
			this.main.dates.rebuildMonth(this.currDate)
		}
		this.nav = new DatepickerNav(flipMonth)
		this.main = new DatepickerMain(this.currDate)

		this.$body.append(this.nav.render(), this.main.render())
	}

	render() {
		return this.$body
	}
}

class DatepickerNav {
	$body: JQuery
	$arrowBack: JQuery
	$display: JQuery
	$arrowForward: JQuery

	constructor(flipMonth: (months: number) => void, displayDate: Date = new Date()) {
		this.$body = $(`<div class="datepicker__nav"></div>`)
		this.$arrowBack = $(`<div class="datepicker__arrow">arrow_back</div>`)
		this.$display = $(
			`<div class="datepicker__display">${displayDate.toLocaleString("ru", {
				month: "long",
			})} ${displayDate.getFullYear()}</div>`
		)
		this.$arrowForward = $(`<div class="datepicker__arrow">arrow_forward</div>`)

		this.$arrowBack.on({
			click: () => {
				flipMonth(-1)
			},
		})
		this.$display.on({
			click: () => {
				console.log("click ", this.$display)
			},
		})
		this.$arrowForward.on({
			click: () => {
				flipMonth(1)
			},
		})

		this.$body.append(this.$arrowBack, this.$display, this.$arrowForward)
	}

	render() {
		return this.$body
	}
}

class DatepickerMain {
	$body: JQuery
	week: DatepickerWeek
	dates: DatepickerDates

	constructor(date: Date) {
		this.$body = $(`<div class="datepicker__main"></div>`)
		this.week = new DatepickerWeek()
		this.dates = new DatepickerDates(date)

		this.$body.append(this.week.render(), this.dates.render())
	}

	render() {
		return this.$body
	}
}

class DatepickerWeek {
	$body: JQuery
	names = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

	constructor() {
		this.$body = $(`<div class="datepicker__week"></div>`)
		this.names.forEach((name) => {
			this.$body.append($(`<div class="datepicker__weekday">${name}</div>`))
		})
	}

	render() {
		return this.$body
	}
}

class DatepickerDates {
	$body: JQuery
	prevMonthDates: JQuery[] = []
	currMonthDates: JQuery[] = []
	nextMonthDates: JQuery[] = []

	constructor(date: Date) {
		this.$body = $(`<div class="datepicker__dates"></div>`)
		this.buildPrevMonthDates(date)
		this.buildCurrMonthDates(date)
		this.buildNextMonthDates(date)

		this.$body.append(this.prevMonthDates, this.currMonthDates, this.nextMonthDates)
	}

	getCorrectDay(wrongDay: number) {
		return wrongDay > 0 ? wrongDay - 1 : 6
	}

	buildPrevMonthDates(currDate: Date) {
		this.prevMonthDates = []
		const currMonthFirstWeekday = currDate.getDay()
		const prevMonthLastDay = new Date(
			currDate.getFullYear(),
			currDate.getMonth(),
			0
		).getDate()
		for (let i = currMonthFirstWeekday; i > 0; i--) {
			const dateNum = prevMonthLastDay + 1 - i
			this.prevMonthDates.push(new DatepickerDate(dateNum).render())
		}
	}

	buildCurrMonthDates(currDate: Date) {
		this.currMonthDates = []
		const currMonthLastDay = new Date(
			currDate.getFullYear(),
			currDate.getMonth() + 1,
			0
		).getDate()
		for (let i = 1; i <= currMonthLastDay; i++) {
			this.currMonthDates.push(new DatepickerDate(i).render())
		}
	}

	buildNextMonthDates(currDate: Date) {
		this.nextMonthDates = []
		const currMonthLastWeekday = this.getCorrectDay(
			new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDay()
		)
		const nextMonthDays = 7 - currMonthLastWeekday - 1

		for (let i = 1; i <= nextMonthDays; i++) {
			this.nextMonthDates.push(new DatepickerDate(i).render())
		}
	}

	rebuildMonth(date: Date) {
		console.log("rebuilt")
		this.buildPrevMonthDates(date)
		this.buildCurrMonthDates(date)
		this.buildNextMonthDates(date)

		this.$body.html()
	}

	render() {
		return this.$body
	}
}

class DatepickerDate {
	$body: JQuery
	$date: JQuery

	constructor(date: number) {
		this.$body = $(`<div class="datepicker__cell"></div>`)
		this.$date = $(`<div class="datepicker__date">${date}</div>`)

		this.$body.append(this.$date)
	}

	render() {
		return this.$body
	}
}
