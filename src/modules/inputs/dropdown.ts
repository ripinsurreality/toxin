interface Item {
	title: string
}

const newItems: Item[] = [
	{
		title: "Спальни",
	},
	{
		title: "Кровати",
	},
	{
		title: "Ванные комнаты",
	},
]

class DropdownModel {
	items: Item[]

	constructor(...items: Item[]) {
		this.items = items
	}
}

;(function ($) {
	$.fn.dropdown = function (): JQuery {
		const view = new DropdownView("Спальни", "Кровати", "Ванные комнаты")
		this.append(view.render())
		return this
	}
})(jQuery)

class DropdownView {
	dropdown: JQuery
	input: JQuery
	bottom: DropdownBottom

	constructor(...items: string[]) {
		this.dropdown = $("<div class='dropdown'></div>").attr("tabindex", 0)
		this.input = $("<div class='dropdown__input'></div>").text("Сколько комнат")
		this.dropdown.on({
			click: (e) => {
				// console.log($(":focus"), document.activeElement, $(":focus").hasClass("dropdown-item"))
				console.log(this.bottom.options)
				e.target === this.input.get(0) &&
					this.dropdown.toggleClass("dropdown--open")
			},
			focusout: (e) => {
				// console.log(!$(e.currentTarget).has(e.relatedTarget))
				// console.log(e.currentTarget)
				// console.log(e.relatedTarget)
				// this.dropdown.removeClass("dropdown--open")
			},
		})
		$(document).on({
			click: (e) => {
				// console.log(this.dropdown.has(e.target).length > 0)
			}
		})

		this.bottom = new DropdownBottom(...items)

		this.dropdown.append(this.input, this.bottom.render())
	}

	render() {
		return this.dropdown
	}
}

class DropdownBottom {
	items: DropdownItem[]
	bottom: JQuery
	ul: JQuery

	constructor(...items: string[]) {
		this.bottom = $("<div class='dropdown__bottom'></div>")

		this.items = []
		for (const item of items) {
			this.items.push(new DropdownItem(item))
		}
		this.ul = $("<ul class='dropdown__options'></ul>")
		this.items.forEach((item) => {
			this.ul.append(item.render())
		})
		this.bottom.append(this.ul)
	}

	get options() {
		return this.items
	}

	render() {
		return this.bottom
	}
}

class DropdownItem {
	body: JQuery
	title: JQuery
	control: JQuery
	value: JQuery
	btnMinus: JQuery
	btnPlus: JQuery

	constructor(title: string /* , value: string */) {
		this.body = $("<li class='dropdown-item'></li>")
			.attr("tabindex", 0)
			.on({
				wheel: (e) => {
					e.preventDefault()
					const oE = e.originalEvent as WheelEvent
					const direction = -Math.sign(oE.deltaY) > 0 ? +1 : -1
					if (direction > 0 || this.valueNum > 0) {
						this.setValue(this.valueNum + direction)
					}
				},
			})
		this.title = $("<h3 class='dropdown-item__title'></h3>").text(
			title
		) /* .attr("data-value", value) */
		this.control = $("<div class='dropdown-item__control'></div>")
		this.btnMinus = $("<div class='dropdown-item__button'></div>")
			.text("-")
			.on({
				click: () => {
					this.valueNum > 0 && this.setValue(this.valueNum - 1)
				},
				focus: (e) => {
					e.preventDefault()
				},
			})
		this.value = $("<h3 class='dropdown-item__value'></h3>").text(0)
		this.btnPlus = $("<div class='dropdown-item__button'></div>")
			.text("+")
			.on({
				click: () => {
					this.setValue(this.valueNum + 1)
				},
				focus: (e) => {
					e.preventDefault()
				},
			})

		this.body.append(
			this.title,
			this.control.append(this.btnMinus, this.value, this.btnPlus)
		)
	}

	setValue(newVal: number) {
		this.value.text(newVal)
	}

	get valueNum() {
		return parseInt(this.value.text(), 10)
	}

	render() {
		return this.body
	}
}
