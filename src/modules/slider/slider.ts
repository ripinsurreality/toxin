(function ($) {
	$.fn.slider = function (this: JQuery, { min, max, step = 1, thumbs }): JQuery {
		const slider: JQuery = $("<div></div>").addClass("slider")
		const rail: JQuery = $("<div></div>").addClass("slider__rail")
		const railInner: JQuery = $("<div></div>").addClass("slider__rail-inner")
		// const track = $("<div></div>").addClass("slider__track")

		const ruler = []
		for (let i = min; i < max + step; i += step) {
			if (i > max) {
				ruler.push(max)
				break
			} else {
				ruler.push(i)
			}
		}

		const rulerPercent = ruler.map(pos => Math.floor(((pos - min) / (max - min) * 100)))


		const thumb = new SliderThumb(0)
		railInner.append(thumb.render())
		rail.append(railInner)

		let held: Boolean = false
		function shiftStep(curr: number, direction: "up" | "down") {
			let result = 0
			rulerPercent.forEach((val, i) => {
				const shiftDir = direction === "up" ? i + 1 : i - 1
				if (getClosest(curr) === val && (shiftDir >= 0 && shiftDir < rulerPercent.length)) {
					result = rulerPercent[shiftDir]
					return
				} else if (getClosest(curr) === val) {
					result = rulerPercent[i]
					return
				}
			})
			return result
		}
		function getClosest(goal: number) {
			return rulerPercent.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev))
		}
		function setThumbPos(e: JQuery.MouseEventBase) {
			const offsetLeft = railInner.offset()?.left ?? 0
			const mousePosX = e.pageX - offsetLeft
			const width = +railInner.css("width").slice(0, -2)
			const goal = mousePosX / width * 100
			thumb.setValue(getClosest(goal))
		}
		$(document).on({
			mousemove: e => {
				if (held) {
					setThumbPos(e)
				}
			},
			mouseleave: e => {
				held = false
			},
			mouseup: e => {
				held = false
			}
		})
		slider.on({
			mousedown: e => {
				held = true
				setThumbPos(e)
			},
			mouseup: e => {
				held = false
			},
			wheel: e => {
				e.preventDefault()
				const oE = e.originalEvent as WheelEvent
				const direction = -Math.sign(oE.deltaY) > 0 ? "up" : "down"
				thumb.setValue(shiftStep(thumb.value, direction))
			},
		})
		slider.append(rail)
		this.append(slider)
		return this
	}
}(jQuery))


class SliderThumb {
	elem: JQuery
	val: number
	constructor(value: number) {
		this.val = value
		this.elem = $("<div class='slider__thumb'></div>")
	}
	render() {
		return this.elem
	}
	setValue(val: number) {
		if (val > 100) {
			this.val = 100
		} else if (val < 0) {
			this.val = 0
		} else {
			this.val = val
		}
		this.elem.css("left", `${this.val}%`)
		return this.value
	}

	public get value(): number {
		return this.val
	}

}