import { DatepickerModel } from "./datepickerModel"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/ru"
import customParseFormat from "dayjs/plugin/customParseFormat"
import weekday from "dayjs/plugin/weekday"
import isToday from "dayjs/plugin/isToday"
import isBetween from "dayjs/plugin/isBetween"

dayjs.locale("ru")
dayjs.extend(customParseFormat)
dayjs.extend(weekday)
dayjs.extend(isToday)
dayjs.extend(isBetween)

export class DatepickerView {
	$body: JQuery
	$input: JQuery
	$inputLabel: JQuery
	$inputArrow: JQuery
	$datepicker: JQuery
	nav: DatepickerNav
	main: DatepickerMain
	control: DatepickerControl

	constructor(public date = dayjs(), model: DatepickerModel) {
		this.$body = $(`<div class="datepicker"></div>`)
		this.$input = $(`<div class="datepicker__input"></div>`)
		this.$inputLabel = $(`<div class="datepicker__input-label">Test</div>`)
		this.$inputArrow = $(`<div class="datepicker__input-arrow"></div>`)
		this.$datepicker = $(`<div class="datepicker__datepicker"></div>`)
		const flipMonth = (months: number) => {
			this.setDate(this.date.add(months, "month"))
			this.main.dates.rebuildMonth(this.date)
			this.nav.resetDisplay(this.date)
		}
		this.nav = new DatepickerNav(flipMonth, this.date)
		this.main = new DatepickerMain(this.date, model)
		this.control = new DatepickerControl(model)

		this.$body.append(
			this.$input.append(this.$inputLabel, this.$inputArrow),
			this.$datepicker.append(
				this.nav.render(),
				this.main.render(),
				this.control.render()
			)
		)
	}

	setDate(date: Dayjs) {
		this.date = date
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

	constructor(flipMonth: (months: number) => void, displayDate: Dayjs) {
		this.$body = $(`<div class="datepicker__nav"></div>`)
		this.$arrowBack = $(`<div class="datepicker__arrow">arrow_back</div>`)
		this.$display = $(`<div class="datepicker__display"></div>`)
		this.$arrowForward = $(
			`<div class="datepicker__arrow">arrow_forward</div>`
		)

		this.resetDisplay(displayDate)

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

	resetDisplay(date: Dayjs) {
		this.$display.text(date.format("MMMM YYYY"))
	}

	render() {
		return this.$body
	}
}

class DatepickerMain {
	$body: JQuery
	week: DatepickerWeek
	dates: DatepickerDates

	constructor(date: Dayjs, model: DatepickerModel) {
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

	constructor(date: Dayjs, model: DatepickerModel) {
		this.$body = $(`<div class="datepicker__dates"></div>`)
		this.model = model

		this.rebuildMonth(date)
	}

	buildPrevMonthDates(currDate: Dayjs) {
		this.prevMonthDates = []
		const currMonthFirstWeekday = currDate.date(1).weekday()
		const prevMonthLastDay = currDate.date(0).date()
		for (let i = currMonthFirstWeekday; i >= 1; i--) {
			const dateNum = prevMonthLastDay + 1 - i
			this.prevMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.subtract(1, "month").date(dateNum),
					true
				).render()
			)
		}

		return this.prevMonthDates
	}

	buildCurrMonthDates(currDate: Dayjs) {
		this.currMonthDates = []
		const currMonthLastDay = currDate.add(1, "month").date(0).date()
		for (let i = 1; i <= currMonthLastDay; i++) {
			this.currMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.date(i)
				).render()
			)
		}

		return this.currMonthDates
	}

	buildNextMonthDates(currDate: Dayjs) {
		this.nextMonthDates = []
		const currMonthLastWeekday = currDate.add(1, "month").date(0).weekday()
		const nextMonthDays = 7 - currMonthLastWeekday - 1

		for (let i = 1; i <= nextMonthDays; i++) {
			this.nextMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.add(1, "month").date(i),
					true
				).render()
			)
		}

		return this.nextMonthDates
	}

	rebuildMonth(date: Dayjs) {
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
		public date: Dayjs,
		public other?: boolean
	) {
		if (!Array.isArray(DatepickerDate.instances)) {
			DatepickerDate.instances = []
		}
		DatepickerDate.instances.push(this)

		this.$body = $(`<div class="datepicker__cell"></div>`)

		this.$date = $(`<div class="datepicker__date">${date.date()}</div>`)
		this.resetClasses()

		this.$body.on({
			click: () => {
				model.setDate(date)
				DatepickerDate.refresh()
			},
		})

		this.$body.append(this.$date)
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
			firstDateExists && this.date.diff(this.model.dates[0], "day") === 0
		const thisIsSecondDate =
			secondDateExists && this.date.diff(this.model.dates[1], "day") === 0

		if (thisIsFirstDate || thisIsSecondDate) {
			this.$date.addClass("datepicker__date--selected")
		} else if (this.date.isToday()) {
			this.$date.addClass("datepicker__date--today")
		} else if (this.other) {
			this.$date.addClass("datepicker__date--other")
		}

		this.$body.removeClass().addClass("datepicker__cell")

		if (firstDateExists && secondDateExists) {
			if (
				(thisIsFirstDate &&
					this.model.dates[0].isBefore(this.model.dates[1])) ||
				(thisIsSecondDate &&
					this.model.dates[1].isBefore(this.model.dates[0]))
			) {
				this.$body.addClass("datepicker__cell--start")
			} else if (
				(thisIsFirstDate &&
					this.model.dates[0].isAfter(this.model.dates[1])) ||
				(thisIsSecondDate &&
					this.model.dates[1].isAfter(this.model.dates[0]))
			) {
				this.$body.addClass("datepicker__cell--end")
			} else if (
				this.date.isBetween(
					this.model.dates[0],
					this.model.dates[1],
					"date",
					"()"
				) ||
				this.date.isBetween(
					this.model.dates[1],
					this.model.dates[0],
					"date",
					"()"
				)
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
