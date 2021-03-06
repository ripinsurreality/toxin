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

interface ViewObserver {
	update(event: string, data: any): void
}

export class View {
	$body: JQuery
	$input: JQuery
	$inputLabel: JQuery
	$inputArrow: JQuery
	$datepicker: JQuery
	nav: DatepickerNav
	main: DatepickerMain
	control: DatepickerControl
	observers: ViewObserver[] = []

	constructor(
		public date = dayjs(),
		model: DatepickerModel,
		multi?: boolean
	) {
		this.$body = $(`<div class="datepicker"></div>`)
		this.$input = $(`<div class="datepicker__input"></div>`).attr(
			"tabindex",
			0
		)
		this.$inputLabel = $(
			`<div class="datepicker__input-label${
				multi && " datepicker__input-label--multi"
			}"></div>`
		)
		const displayDate = () => {
			if (multi) {
				this.$inputLabel.text(
					`${
						model.firstDate
							? model.firstDate.format("DD MMM").replace(".", "")
							: "Прибытие"
					} - ${
						model.lastDate
							? model.lastDate.format("DD MMM").replace(".", "")
							: "убытие"
					}`
				)
			} else {
				this.$inputLabel.text(
					`${
						model.dates[0]
							? model.dates[0].format("DD.MM.YYYY")
							: "ДД.ММ.ГГГГ"
					}`
				)
			}
		}
		displayDate()
		this.$inputArrow = $(`<div class="datepicker__input-arrow"></div>`)
		this.$datepicker = $(`<div class="datepicker__datepicker"></div>`)
		const flipMonth = (months: number) => {
			this.setDate(this.date.add(months, "month"))
			this.main.dates.rebuildMonth(this.date, displayDate)
			this.nav.resetDisplay(this.date)
		}
		this.nav = new DatepickerNav(flipMonth, this.date)
		this.main = new DatepickerMain(this.date, model, displayDate)
		this.control = new DatepickerControl(model, displayDate)

		this.$input.on({
			click: (e) => {
				this.switchDatepicker()
			},
			focusout: (e) => {
				console.log(e.relatedTarget)
				// this.switchDatepicker(false)
			}
		})

		this.$body.append(
			this.$input.append(this.$inputLabel, this.$inputArrow),
			this.$datepicker.append(
				this.nav.render(),
				this.main.render(),
				this.control.render()
			)
		)
	}

	switchDatepicker(on?: boolean) {
		switch (on) {
			case true: {
				!this.$datepicker.hasClass("datepicker__datepicker--open") &&
					this.$datepicker.addClass("datepicker__datepicker--open")
				break
			}
			case false: {
				this.$datepicker.hasClass("datepicker__datepicker--open") &&
					this.$datepicker.removeClass("datepicker__datepicker--open")
				break
			}
			default: {
				this.$datepicker.toggleClass("datepicker__datepicker--open")
				break
			}
		}
	}

	setDate(date: Dayjs) {
		this.date = date
	}

	sub(o: ViewObserver) {
		this.observers.push(o)
	}

	unsub(o: ViewObserver) {
		this.observers.filter(ob => o !== ob)
	}

	update(event: string, data: any) {
		this.observers.forEach(o => o.update(event, data))
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
		// this.$display.on({
		// 	click: () => {
		// 		console.log("click ", this.$display)
		// 	},
		// })
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

	constructor(date: Dayjs, model: DatepickerModel, displayDate: () => void) {
		this.$body = $(`<div class="datepicker__main"></div>`)
		this.week = new DatepickerWeek()
		this.dates = new DatepickerDates(date, model, displayDate)

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

	constructor(date: Dayjs, model: DatepickerModel, displayDates: () => void) {
		this.$body = $(`<div class="datepicker__dates"></div>`)
		this.model = model

		this.rebuildMonth(date, displayDates)
	}

	buildPrevMonthDates(currDate: Dayjs, displayDates: () => void) {
		this.prevMonthDates = []
		const currMonthFirstWeekday = currDate.date(1).weekday()
		const prevMonthLastDay = currDate.date(0).date()
		for (let i = currMonthFirstWeekday; i >= 1; i--) {
			const dateNum = prevMonthLastDay + 1 - i
			this.prevMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.subtract(1, "month").date(dateNum),
					displayDates,
					true
				).render()
			)
		}

		return this.prevMonthDates
	}

	buildCurrMonthDates(currDate: Dayjs, displayDates: () => void) {
		this.currMonthDates = []
		const currMonthLastDay = currDate.add(1, "month").date(0).date()
		for (let i = 1; i <= currMonthLastDay; i++) {
			this.currMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.date(i),
					displayDates
				).render()
			)
		}

		return this.currMonthDates
	}

	buildNextMonthDates(currDate: Dayjs, displayDates: () => void) {
		this.nextMonthDates = []
		const currMonthLastWeekday = currDate.add(1, "month").date(0).weekday()
		const nextMonthDays = 7 - currMonthLastWeekday - 1

		for (let i = 1; i <= nextMonthDays; i++) {
			this.nextMonthDates.push(
				new DatepickerDate(
					this.model,
					currDate.add(1, "month").date(i),
					displayDates,
					true
				).render()
			)
		}

		return this.nextMonthDates
	}

	rebuildMonth(date: Dayjs, displayDates: () => void) {
		DatepickerDate.clear()
		this.$body
			.html("")
			.append(
				this.buildPrevMonthDates(date, displayDates),
				this.buildCurrMonthDates(date, displayDates),
				this.buildNextMonthDates(date, displayDates)
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
		displayDates: () => void,
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
				displayDates()
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

	constructor(model: DatepickerModel, displayDate: () => void) {
		this.$body = $(`<div class="datepicker__control"></div>`)
		this.$clear = $(`<h3 class="datepicker__button">Очистить</h3>`)
		this.$accept = $(`<h3 class="datepicker__button">Применить</h3>`)

		this.$clear.on({
			click: () => {
				model.resetDates()
				DatepickerDate.refresh()
				displayDate()
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
