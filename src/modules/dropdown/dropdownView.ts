import { Item } from "./dropdownModel"

export class DropdownView {
	dropdown: JQuery
	input: JQuery
	label: JQuery
	arrow: JQuery
	bottom: DropdownBottom

	constructor(defaultItem: string, items: Item[]) {
		/* INITS */
		this.dropdown = $("<div class='dropdown'></div>").attr("tabindex", 0)
		this.input = $("<div class='dropdown__input'></div>")
		this.label = $("<div class='dropdown__label'></div>")
		this.arrow = $("<div class='dropdown__arrow'></div>")
		const onItemChange = () => {
			this.label.text(
				items
					.map((item) => {
						if (item.value === 0) {
							return ""
						} else {
							return `${item.value} ${item.getTitle()}`
						}
					})
					.filter((item) => {
						if (item) return item
					})
					.join(", ") || defaultItem
			)
		}
		onItemChange()
		this.bottom = new DropdownBottom(items, onItemChange)

		/* EVENTS */
		this.dropdown.on({
			click: (e) => {
				if (
					e.target.contains(this.label.get(0)) ||
					e.target.contains(this.arrow.get(0))
				) {
					this.switchDropdown()
				}
			},
			focusout: (e) => {
				if (
					(e.relatedTarget instanceof HTMLElement &&
						!this.dropdown.get(0).contains(e.relatedTarget)) ||
					!e.relatedTarget
				) {
					this.switchDropdown("close")
				}
			},
			keydown: (e) => {
				if (
					e.code === "Space" &&
					e.target instanceof HTMLElement &&
					e.target === this.dropdown.get(0)
				) {
					e.preventDefault()
					console.log()
					this.switchDropdown()
				}
			},
		})

		/* APPENDS */
		this.dropdown.append(
			this.input.append(this.label, this.arrow),
			this.bottom.render()
		)
	}

	switchDropdown(state?: "open" | "close" | "toggle") {
		switch (state) {
			case "open": {
				!this.dropdown.hasClass("dropdown--open") &&
					this.dropdown.addClass("dropdown--open")
				break
			}
			case "close": {
				this.dropdown.hasClass("dropdown--open") &&
					this.dropdown.removeClass("dropdown--open")
				break
			}
			case "toggle":
			default: {
				this.dropdown.toggleClass("dropdown--open")
				break
			}
		}
	}

	render() {
		return this.dropdown
	}
}

class DropdownBottom {
	items: DropdownItem[]
	bottom: JQuery
	ul: JQuery

	constructor(items: Item[], onItemChange: () => void) {
		/* INITS */
		this.bottom = $("<div class='dropdown__bottom'></div>")
		this.items = items.map((item) => new DropdownItem(item, onItemChange))
		this.ul = $("<ul class='dropdown__options'></ul>")

		/* APPENDS */
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

	constructor(item: Item, onItemChange: () => void) {
		/* INITS */
		this.body = $("<li class='dropdown-item'></li>").attr("tabindex", 0)
		this.title = $("<h3 class='dropdown-item__title'></h3>").text(
			item.getTitle(true)
		)
		this.control = $("<div class='dropdown-item__control'></div>")
		this.btnMinus = $("<div class='dropdown-item__button'></div>").text("-")
		this.value = $("<h3 class='dropdown-item__value'></h3>").text(item.value)
		this.btnPlus = $("<div class='dropdown-item__button'></div>").text("+")

		/* EVENTS */
		this.body.on({
			wheel: (e) => {
				e.preventDefault()
				const oE = e.originalEvent as WheelEvent
				const direction = -Math.sign(oE.deltaY) > 0 ? "+" : "-"
				this.dispatchValue(item, direction, onItemChange)
			},
			keydown: (e) => {
				if (e.key === "+" || e.key === "-") {
					this.dispatchValue(item, e.key, onItemChange)
				}
			}
		})

		this.btnMinus.on({
			click: () => {
				this.dispatchValue(item, "-", onItemChange)
			},
			focus: (e) => {
				e.preventDefault()
			},
		})

		this.btnPlus.on({
			click: () => {
				this.dispatchValue(item, "+", onItemChange)
			},
			focus: (e) => {
				e.preventDefault()
			},
		})

		/* APPENDS */
		this.body.append(
			this.title,
			this.control.append(this.btnMinus, this.value, this.btnPlus)
		)
	}

	dispatchValue(item: Item, type: "+" | "-", onItemChange: () => void) {
		const result = item.dispatchValue(type)
		if (result || result === 0) {
			this.value.text(result)
			onItemChange()
		}
	}

	get valueNum() {
		return parseInt(this.value.text(), 10)
	}

	render() {
		return this.body
	}
}
