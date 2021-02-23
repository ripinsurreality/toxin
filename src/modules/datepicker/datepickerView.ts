import { DatepickerModel } from "./datepickerModel"

export class DatepickerView {
	$body: JQuery
	nav: DatepickerNav
	main: DatepickerMain
	control: DatepickerControl

	constructor(public date = new Date(), model: DatepickerModel) {
		this.$body = $(`<div class="datepicker"></div>`)
		const flipMonth = (months: number) => {
			this.date.setMonth(this.date.getMonth() + months)
			this.main.dates.rebuildMonth(this.date)
			this.nav.resetDisplay(this.date)
		}
		this.nav = new DatepickerNav(flipMonth, this.date)
		this.main = new DatepickerMain(this.date, model)
		this.control = new DatepickerControl(model)

		this.$body.append(
			this.nav.render(),
			this.main.render(),
			this.control.render()
		)
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
	model: DatepickerModel

	constructor(date: Date, model: DatepickerModel) {
		this.$body = $(`<div class="datepicker__dates"></div>`)
		this.model = model

		this.$body.append(
			this.buildPrevMonthDates(date),
			this.buildCurrMonthDates(date),
			this.buildNextMonthDates(date)
		)
	}

	getCorrectDay(wrongDay: number) {
		return wrongDay > 0 ? wrongDay - 1 : 6
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
					this.model,
					new Date(
						currDate.getFullYear(),
						currDate.getMonth() - 1,
						dateNum
					),
					true
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
					this.model,
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
					this.model,
					new Date(
						currDate.getFullYear(),
						currDate.getMonth() + 1,
						i
					),
					true
				).render()
			)
		}

		return this.nextMonthDates
	}

	rebuildMonth(date: Date) {
		DatepickerDate.clear()
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
	static instances: DatepickerDate[]

	$body: JQuery
	$date: JQuery

	constructor(
		public model: DatepickerModel,
		public date: Date,
		public other?: boolean
	) {
		if (!Array.isArray(DatepickerDate.instances)) {
			DatepickerDate.instances = []
		}
		DatepickerDate.instances.push(this)

		this.$body = $(`<div class="datepicker__cell"></div>`)

		this.$date = $(`<div class="datepicker__date">${date.getDate()}</div>`)
		this.resetClasses()

		this.$body.on({
			click: () => {
				model.setDate(date)
				DatepickerDate.refresh()
			},
		})

		this.$body.append(this.$date)
	}

	get isToday() {
		const today = new Date()
		return (
			this.date.getTime() ===
			new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			).getTime()
		)
	}

	static clear() {
		DatepickerDate.instances = []
	}

	static refresh() {
		DatepickerDate.instances.forEach((item) => {
			item.resetClasses()
		})
	}

	resetClasses() {
		this.$date.removeClass().addClass("datepicker__date")

		const firstDateExists = typeof this.model.dates[0] !== "undefined"
		const secondDateExists = typeof this.model.dates[1] !== "undefined"

		const thisIsFirstDate =
			firstDateExists &&
			this.date.getTime() === this.model.dates[0].getTime()
		const thisIsSecondDate =
			secondDateExists &&
			this.date.getTime() === this.model.dates[1].getTime()

		if (thisIsFirstDate || thisIsSecondDate) {
			this.$date.addClass("datepicker__date--selected")
		} else if (this.isToday) {
			this.$date.addClass("datepicker__date--today")
		} else if (this.other) {
			this.$date.addClass("datepicker__date--other")
		}

		this.$body.removeClass().addClass("datepicker__cell")

		if (firstDateExists && secondDateExists) {
			if (
				(thisIsFirstDate &&
					this.model.dates[0].getTime() <
						this.model.dates[1].getTime()) ||
				(thisIsSecondDate &&
					this.model.dates[1].getTime() <
						this.model.dates[0].getTime())
			) {
				this.$body.addClass("datepicker__cell--start")
			} else if (
				(thisIsFirstDate &&
					this.model.dates[0].getTime() >
						this.model.dates[1].getTime()) ||
				(thisIsSecondDate &&
					this.model.dates[1].getTime() >
						this.model.dates[0].getTime())
			) {
				this.$body.addClass("datepicker__cell--end")
			} else if (
				(this.date.getTime() > this.model.dates[0].getTime() &&
					this.date.getTime() < this.model.dates[1].getTime()) ||
				(this.date.getTime() < this.model.dates[0].getTime() &&
					this.date.getTime() > this.model.dates[1].getTime())
			) {
				this.$body.addClass("datepicker__cell--middle")
			}
		}
	}

	render() {
		return this.$body
	}
}

class DatepickerControl {
	$body: JQuery
	$clear: JQuery
	$accept: JQuery

	constructor(model: DatepickerModel) {
		this.$body = $(`<div class="datepicker__control"></div>`)
		this.$clear = $(`<h3 class="datepicker__button">Очистить</h3>`)
		this.$accept = $(`<h3 class="datepicker__button">Применить</h3>`)

		this.$clear.on({
			click: () => {
				model.resetDates()
				DatepickerDate.refresh()
			},
		})

		this.$accept.on({
			click: () => {
				console.log("accepted")
			},
		})

		this.$body.append(this.$clear, this.$accept)
	}

	render() {
		return this.$body
	}
}
