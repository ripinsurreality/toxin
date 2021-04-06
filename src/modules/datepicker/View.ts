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
	updateView(options: any): void
}

interface FlipDateArgs {
	days?: number
	months?: number
	years?: number
}

export class View {
	$body: JQuery
	$datepicker: JQuery
	input: DatepickerInput
	nav: DatepickerNav
	main: DatepickerMain
	control: DatepickerControl

	private date = dayjs()

	constructor() {
		this.$body = $(`<div class="datepicker"></div>`)
		this.$datepicker = $(`<div class="datepicker__datepicker"></div>`)
		this.input = new DatepickerInput(this.switchDatepicker)
		this.nav = new DatepickerNav(this.flipDate)
		this.main = new DatepickerMain(this.update)
		this.control = new DatepickerControl(this.update, this.switchDatepicker)
		this.$body.append(
			this.input.render,
			this.$datepicker.append(
				this.nav.render,
				this.main.render,
				this.control.render
			)
		)
	}

	private switchDatepicker = (on?: boolean) => {
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

	flipDate = (
		{ days = 0, months = 0, years = 0 }: FlipDateArgs,
		newDate?: Dayjs
	) => {
		if (newDate) {
			this.date = newDate
		}
		this.date = this.date
			.add(days, "day")
			.add(months, "month")
			.add(years, "year")

		this.updateViews()
	}

	updateViews() {
		this.nav.displayDate = this.date
		this.main.dates.build(this.date)
		this.update({ type: "getDates" })
	}

	setDate(dates: Dayjs[], multi?: boolean) {
		this.input.setDisplayDate(dates, multi)
		this.main.dates.refresh(dates)
	}

	private observers: ViewObserver[] = []

	sub(o: ViewObserver) {
		this.observers.push(o)
	}

	unsub(o: ViewObserver) {
		this.observers.filter((ob) => o !== ob)
	}

	update = (options: any) => {
		this.observers.forEach((o) => o.updateView(options))
	}

	get render() {
		return this.$body
	}
}

class DatepickerInput {
	$body: JQuery
	$label: JQuery
	$display: JQuery
	$arrow: JQuery

	constructor(private switchDatepicker: (on?: boolean) => void) {
		this.$body = $(`<div class="datepicker__input"></div>`).attr(
			"tabindex",
			0
		)
		this.$label = $(`<div class="datepicker__input-label"></div>`)
		this.$display = $(`<div class="datepicker__input-display"></div>`)
		this.$arrow = $(`<div class="datepicker__input-arrow"></div>`)

		this.$body.on({
			click: (e) => {
				this.switchDatepicker()
			},
		})

		this.$body.append(this.$display, this.$arrow)
	}

	set label(label: string) {
		this.$label.text(label)
	}

	setDisplayDate(dates: Dayjs[], multi?: boolean) {
		if (multi) {
			const firstDate = dates[0]
				? dates[0].format("DD MMM").replace(".", "")
				: "прибытие"
			const lastDate = dates[1]
				? dates[1].format("DD MMM").replace(".", "")
				: "выезд"
			this.$display.text(`${firstDate} - ${lastDate}`)
			return
		}
		this.$display.text(
			`${dates[0] ? dates[0].format("DD.MM.YYYY") : "ДД.ММ.ГГГГ"}`
		)
	}

	get render() {
		return this.$body
	}
}

class DatepickerNav {
	$body: JQuery
	$arrowBack: JQuery
	$display: JQuery
	$arrowForward: JQuery

	constructor(private flipDate: (options: FlipDateArgs) => void) {
		this.$body = $(`<div class="datepicker__nav"></div>`)
		this.$arrowBack = $(`<div class="datepicker__arrow">arrow_back</div>`)
		this.$display = $(`<div class="datepicker__display"></div>`)
		this.$arrowForward = $(
			`<div class="datepicker__arrow">arrow_forward</div>`
		)

		this.$arrowBack.on({
			click: () => {
				this.flipDate({ months: -1 })
			},
		})
		this.$arrowForward.on({
			click: () => {
				this.flipDate({ months: 1 })
			},
		})

		this.$body.append(this.$arrowBack, this.$display, this.$arrowForward)
	}

	set displayDate(date: Dayjs) {
		this.$display.text(date.format("MMMM YYYY"))
	}

	get render() {
		return this.$body
	}
}

class DatepickerMain {
	$body: JQuery
	week: DatepickerWeek
	dates: DatepickerDates

	constructor(private update: (options: any) => void) {
		this.$body = $(`<div class="datepicker__main"></div>`)
		this.week = new DatepickerWeek()
		this.dates = new DatepickerDates(this.update)

		this.$body.append(this.week.render, this.dates.render)
	}

	get render() {
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

	get render() {
		return this.$body
	}
}

class DatepickerDates {
	$body: JQuery
	dates: DatepickerDate[] = []

	constructor(private update: (options: any) => void) {
		this.$body = $(`<div class="datepicker__dates"></div>`)
	}

	buildPrevMonthDates(currDate: Dayjs) {
		const currMonthFirstWeekday = currDate.date(1).weekday()
		const prevMonthLastDay = currDate.date(0).date()
		for (let i = currMonthFirstWeekday; i >= 1; i--) {
			const dateNum = prevMonthLastDay + 1 - i
			this.dates.push(
				new DatepickerDate(
					currDate.subtract(1, "month").date(dateNum),
					this.update,
					true
				)
			)
		}
	}

	buildCurrMonthDates(currDate: Dayjs) {
		const currMonthLastDay = currDate.add(1, "month").date(0).date()
		for (let i = 1; i <= currMonthLastDay; i++) {
			this.dates.push(
				new DatepickerDate(currDate.date(i), this.update)
			)
		}
	}

	buildNextMonthDates(currDate: Dayjs) {
		const currMonthLastWeekday = currDate.add(1, "month").date(0).weekday()
		const nextMonthDays = 7 - currMonthLastWeekday - 1

		for (let i = 1; i <= nextMonthDays; i++) {
			this.dates.push(
				new DatepickerDate(
					currDate.add(1, "month").date(i),
					this.update,
					true
				)
			)
		}
	}

	refresh(dates?: Dayjs[]) {
		this.dates.forEach(date => date.resetClasses(dates || []))
	}

	get renderDates() {
		return this.dates.map(date => date.render)
	}

	build(date: Dayjs) {
		this.dates = []
		this.buildPrevMonthDates(date)
		this.buildCurrMonthDates(date)
		this.buildNextMonthDates(date)
		this.$body.html("").append(this.renderDates)
	}

	get render() {
		return this.$body
	}
}

class DatepickerDate {

	$body: JQuery
	$date: JQuery

	constructor(
		public date: Dayjs,
		private update: (options: any) => void,
		public other?: boolean
	) {

		this.$body = $(`<div class="datepicker__cell"></div>`)

		this.$date = $(`<div class="datepicker__date">${date.date()}</div>`)

		this.$body.on({
			click: () => {
				this.update({ type: "setDate", date: this.date })
			},
		})

		this.$body.append(this.$date)
	}

	resetClasses(dates: Dayjs[]) {
		this.$date.removeClass().addClass("datepicker__date")

		const firstDateExists = typeof dates[0] !== "undefined"
		const secondDateExists = typeof dates[1] !== "undefined"

		const thisIsFirstDate =
			firstDateExists && this.date.diff(dates[0], "day") === 0
		const thisIsSecondDate =
			secondDateExists && this.date.diff(dates[1], "day") === 0

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
				(thisIsFirstDate && dates[0].isBefore(dates[1])) ||
				(thisIsSecondDate && dates[1].isBefore(dates[0]))
			) {
				this.$body.addClass("datepicker__cell--start")
			} else if (
				(thisIsFirstDate && dates[0].isAfter(dates[1])) ||
				(thisIsSecondDate && dates[1].isAfter(dates[0]))
			) {
				this.$body.addClass("datepicker__cell--end")
			} else if (
				this.date.isBetween(dates[0], dates[1], "date", "()") ||
				this.date.isBetween(dates[1], dates[0], "date", "()")
			) {
				this.$body.addClass("datepicker__cell--middle")
			}
		}
	}

	get render() {
		return this.$body
	}
}

class DatepickerControl {
	$body: JQuery
	$clear: JQuery
	$accept: JQuery

	constructor(private update: (options: any) => void, private switchDatepicker: (on?: boolean) => void) {
		this.$body = $(`<div class="datepicker__control"></div>`)
		this.$clear = $(`<h3 class="datepicker__button">Очистить</h3>`)
		this.$accept = $(`<h3 class="datepicker__button">Применить</h3>`)

		this.$clear.on({
			click: () => {
				this.update({
					type: "resetDates"
				})
			},
		})

		this.$accept.on({
			click: () => {
				this.switchDatepicker(false)
			},
		})

		this.$body.append(this.$clear, this.$accept)
	}

	get render() {
		return this.$body
	}
}
