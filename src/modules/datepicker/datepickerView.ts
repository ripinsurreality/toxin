import { DatepickerModel } from "./datepickerModel"

export class DatepickerView {
	$body: JQuery
	nav: DatepickerNav
	main: DatepickerMain
	// control: DatepickerControl
	today = new Date()

	constructor(public date = new Date(), model: DatepickerModel) {
		this.$body = $(`<div class="datepicker"></div>`)
		const flipMonth = (months: number) => {
			this.date.setMonth(this.date.getMonth() + months)
			this.main.dates.rebuildMonth(this.date)
			this.nav.resetDisplay(this.date)
		}
		this.nav = new DatepickerNav(flipMonth, this.date)
		this.main = new DatepickerMain(this.date, model)

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

	constructor(
		flipMonth: (months: number) => void,
		displayDate: Date = new Date()
	) {
		this.$body = $(`<div class="datepicker__nav"></div>`)
		this.$arrowBack = $(`<div class="datepicker__arrow">arrow_back</div>`)
		this.$display = $(
			`<div class="datepicker__display">${displayDate.toLocaleString(
				"ru",
				{
					month: "long",
				}
			)} ${displayDate.getFullYear()}</div>`
		)
		this.$arrowForward = $(
			`<div class="datepicker__arrow">arrow_forward</div>`
		)

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

	resetDisplay(date: Date) {
		this.$display.text(
			`${date.toLocaleString("ru", {
				month: "long",
			})} ${date.getFullYear()}`
		)
	}

	render() {
		return this.$body
	}
}

class DatepickerMain {
	$body: JQuery
	week: DatepickerWeek
	dates: DatepickerDates

	constructor(date: Date, model: DatepickerModel) {
		this.$body = $(`<div class="datepicker__main"></div>`)
		this.week = new DatepickerWeek()
		this.dates = new DatepickerDates(date, model)

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
			this.$body.append(
				$(`<div class="datepicker__weekday">${name}</div>`)
			)
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

	constructor(date: Date, model: DatepickerModel) {
		this.$body = $(`<div class="datepicker__dates"></div>`)

		this.$body.append(
			this.buildPrevMonthDates(date),
			this.buildCurrMonthDates(date),
			this.buildNextMonthDates(date)
		)
	}

	getCorrectDay(wrongDay: number) {
		return wrongDay > 0 ? wrongDay - 1 : 6
	}

	isToday(date: Date) {
		const today = new Date()
		return (
			new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate()
			).getTime() ===
			new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			).getTime()
		)
	}

	buildPrevMonthDates(currDate: Date) {
		this.prevMonthDates = []
		const currMonthFirstWeekday = this.getCorrectDay(currDate.getDay())
		const prevMonthLastDay = new Date(
			currDate.getFullYear(),
			currDate.getMonth(),
			0
		).getDate()
		for (let i = currMonthFirstWeekday; i > 1; i--) {
			const dateNum = prevMonthLastDay + 1 - i
			this.prevMonthDates.push(
				new DatepickerDate(
					new Date(currDate.getFullYear(), currDate.getMonth() - 1, dateNum)
				).render()
			)
		}

		return this.prevMonthDates
	}

	buildCurrMonthDates(currDate: Date) {
		this.currMonthDates = []
		const currMonthLastDay = new Date(
			currDate.getFullYear(),
			currDate.getMonth() + 1,
			0
		).getDate()
		for (let i = 1; i <= currMonthLastDay; i++) {
			this.currMonthDates.push(
				new DatepickerDate(
					new Date(currDate.getFullYear(), currDate.getMonth(), i)
				).render()
			)
		}

		return this.currMonthDates
	}

	buildNextMonthDates(currDate: Date) {
		this.nextMonthDates = []
		const currMonthLastWeekday = this.getCorrectDay(
			new Date(
				currDate.getFullYear(),
				currDate.getMonth() + 1,
				0
			).getDay()
		)
		const nextMonthDays = 7 - currMonthLastWeekday - 1

		for (let i = 1; i <= nextMonthDays; i++) {
			this.nextMonthDates.push(
				new DatepickerDate(
					new Date(currDate.getFullYear(), currDate.getMonth() + 1, i)
				).render()
			)
		}

		return this.nextMonthDates
	}

	rebuildMonth(date: Date) {
		this.$body
			.html("")
			.append(
				this.buildPrevMonthDates(date),
				this.buildCurrMonthDates(date),
				this.buildNextMonthDates(date)
			)
	}

	render() {
		return this.$body
	}
}

class DatepickerDate {
	$body: JQuery
	$date: JQuery

	constructor(date: Date, other?: boolean) {
		this.$body = $(`<div class="datepicker__cell"></div>`)
		const today = new Date()
		const isToday =
			date.getTime() ===
			new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			).getTime()
		this.$date = $(
			`<div class="datepicker__date${
				isToday
					? " datepicker__date--today"
					: other
					? " datepicker__date--other"
					: ""
			}">${date.getDate()}</div>`
		)

		this.$body.append(this.$date)
	}

	render() {
		return this.$body
	}
}
