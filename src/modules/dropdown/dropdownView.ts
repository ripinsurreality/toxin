import { Item } from "./dropdownModel"

export interface ViewObserver {
	updateView(options: any): void
}

export class DropdownView {
	$dropdown: JQuery
	$input: JQuery
	$label: JQuery
	$arrow: JQuery
	bottom: DropdownBottom

	set label(t: string) {
		this.$label.text(t)
	}

	constructor() {
		/* INITS */
		this.$dropdown = $("<div class='dropdown'></div>").attr("tabindex", 0)
		this.$input = $("<div class='dropdown__input'></div>")
		this.$label = $("<div class='dropdown__label'></div>")
		this.$arrow = $("<div class='dropdown__arrow'></div>")
		this.bottom = new DropdownBottom(this.update)

		/* EVENTS */
		this.$dropdown.on({
			click: (e) => {
				if (
					e.target.contains(this.$label.get(0)) ||
					e.target.contains(this.$arrow.get(0))
				) {
					this.switchDropdown()
				}
			},
			focusout: (e) => {
				if (
					(e.relatedTarget instanceof HTMLElement &&
						!this.$dropdown.get(0).contains(e.relatedTarget)) ||
					!e.relatedTarget
				) {
					this.switchDropdown(false)
				}
			},
			keydown: (e) => {
				if (
					e.code === "Space" &&
					e.target instanceof HTMLElement &&
					e.target === this.$dropdown.get(0)
				) {
					e.preventDefault()
					this.switchDropdown()
				}
			},
		})

		/* APPENDS */
		this.$dropdown.append(
			this.$input.append(this.$label, this.$arrow),
			this.bottom.render
		)
	}

	switchDropdown(on?: boolean) {
		switch (on) {
			case true: {
				!this.$dropdown.hasClass("dropdown--open") &&
					this.$dropdown.addClass("dropdown--open")
				break
			}
			case false: {
				this.$dropdown.hasClass("dropdown--open") &&
					this.$dropdown.removeClass("dropdown--open")
				break
			}
			default: {
				this.$dropdown.toggleClass("dropdown--open")
				break
			}
		}
		this.bottom.switchItemsTabIndex(on)
	}

	addItem() {
		this.bottom.addItem()
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
		return this.$dropdown
	}
}

class DropdownBottom {
	items: DropdownItem[] = []
	$body: JQuery
	$ul: JQuery
	$control: JQuery
	$clear: JQuery
	$accept: JQuery

	constructor(private update: (options: any) => void) {
		/* INITS */
		this.$body = $("<div class='dropdown__bottom'></div>")
		this.$ul = $("<ul class='dropdown__options'></ul>")

		this.$control = $("<div class='dropdown__control'></div>")
		this.$clear = $("<h3 class='dropdown__clear'>Очистить</h3>")
		this.$accept = $("<h3 class='dropdown__accept'>Применить</h3>")

		/* EVENTS */
		this.$clear.on({
			click: (e) => {
				this.resetItems()
			},
		})

		/* APPENDS */
		this.items.forEach((item) => {
			this.$ul.append(item.render)
		})
		this.$body.append(
			this.$ul,
			this.$control.append(this.$clear, this.$accept)
		)
	}

	addItem() {
		const newItem = new DropdownItem(this.update,
			this.items.length
		)
		this.items.push(newItem)
		this.$ul.append(newItem.render)
	}

	resetItems() {
		this.items.forEach((item) => {
			item.dispatchValue()
		})
	}

	switchItemsTabIndex(on?: boolean) {
		this.items.forEach((item) => {
			item.switchTabIndex(on)
		})
	}

	get render() {
		return this.$body
	}
}

class DropdownItem {
	$body: JQuery
	$title: JQuery
	$control: JQuery
	$btnMinus: JQuery
	$value: JQuery
	$btnPlus: JQuery

	constructor(private update: (options: any) => void, private index: number) {
		/* INITS */
		this.$body = $("<li class='dropdown-item'></li>")
		this.$title = $("<h3 class='dropdown-item__title'></h3>")
		this.$control = $("<div class='dropdown-item__control'></div>")
		this.$btnMinus = $("<div class='dropdown-item__button'></div>").text(
			"-"
		)
		this.$value = $("<h3 class='dropdown-item__value'></h3>")
		this.$btnPlus = $("<div class='dropdown-item__button'></div>").text("+")

		/* EVENTS */
		this.$body.on({
			wheel: (e) => {
				e.preventDefault()
				const oE = e.originalEvent as WheelEvent
				const direction = -Math.sign(oE.deltaY) > 0 ? "+" : "-"
				this.dispatchValue(direction)
			},
			keydown: (e) => {
				if (e.key === "+" || e.key === "-") {
					this.dispatchValue(e.key)
				}
			},
		})

		this.$btnMinus.on({
			click: () => {
				this.dispatchValue("-")
			},
			focus: (e) => {
				e.preventDefault()
			},
		})

		this.$btnPlus.on({
			click: () => {
				this.dispatchValue("+")
			},
			focus: (e) => {
				e.preventDefault()
			},
		})

		/* APPENDS */
		this.$body.append(
			this.$title,
			this.$control.append(this.$btnMinus, this.$value, this.$btnPlus)
		)
	}

	dispatchValue(type?: "+" | "-") {
		this.update({
			type: "dispatchValue",
			payload: type,
			index: this.index,
		})
	}

	switchTabIndex(on?: boolean) {
		switch (on) {
			case true: {
				this.$body.attr("tabindex", 0)
				break
			}
			case false: {
				this.$body.removeAttr("tabindex")
				break
			}

			default: {
				this.$body[0].hasAttribute("tabindex")
					? this.$body.removeAttr("tabindex")
					: this.$body.attr("tabindex", 0)
				break
			}
		}
	}

	get value() {
		return parseInt(this.$value.text(), 10)
	}

	set value(val: string | number) {
		this.$value.text(val)
	}

	set title(t: string) {
		this.$title.text(t)
	}

	get render() {
		return this.$body
	}
}
