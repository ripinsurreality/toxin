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
			// console.log(ruler)
		}

		const rulerPercent = ruler.map(pos => Math.floor(((pos - min) / (max - min) * 100)))

		// const thumbElems = []
		// if (thumbs) {
		// 	thumbs.map(thumb => thumbElems.push($("<div></div>").addClass("slider__thumb")))
		// }

		// // const thumbElems = thumbs.map(val => $("<div></div>").addClass("slider__thumb").attr("data-value",))
		const thumb = $("<div></div>").addClass("slider__thumb")
		// // const thumb2 = $("<div></div>").addClass("slider__thumb")

		// rulerPercent.map(pos => this.append($("<div></div>").text(pos)))
		railInner.append(thumb)
		rail.append(railInner)

		slider.on("mousemove", e => {
			// console.log(`PageX: ${e.pageX} PageY: ${e.pageY}`)
			// console.log(`Offset X: ${e.pageX - (slider.offset()?.left ?? 0)} Offset Y: ${e.pageY - (slider.offset()?.top ?? 0)}`)

			const offsetLeft = rail.offset()?.left ?? 0
			const mousePosX = e.pageX - offsetLeft
			const width = +rail.css("width").slice(0, -2)
			const goal = mousePosX / width * 100
			// console.log(`Offset X%: ${goal} Offset Y: ${e.pageY - (slider.offset()?.top ?? 0)}`)
			const closest = rulerPercent.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev))
			thumb.css("left", `${closest}%`)
			console.log(closest)
		})
		slider.append(rail)
		this.append(slider)
		return this
	}
}(jQuery))


// class SliderThumb {
// 	elem: JQuery
// 	value: number
// 	constructor(value: number) {
// 		this.value = value
// 		this.elem = $("<div></div>").addClass("slider__thumb").css("left")
// 	}
// 	render() {
// 		return this.elem
// 	}

// }