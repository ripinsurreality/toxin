import "@/styles/styles.sass"
import "@modules/slider/slider"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "@modules/doughnut/doughnut"
import "inputmask/dist/jquery.inputmask.min"
import "inputmask/dist/bindings/inputmask.binding"
import dayjs from "dayjs"

// IIFE - Immediately Invoked Function Expression
;(function ($, window, document) {
	// console.log($)
	// console.log(jQuery)
	// The $ is now locally scoped

	// Listen for the jQuery ready event on the document
	$(function () {
		$(":input").inputmask()
		$(".slider-wrapper").slider({
			min: 100,
			max: 201,
			step: 10,
		})

		$(".dropdown-3").dropdown("comfort")
		$(".dropdown-2").dropdown("guests")
		$(".dropdown-1").dropdown("comfort", [-1, 3])

		// $(".dtpckr").datepicker({ multi: true })
		// $(".dtpckr2").datepicker()

		// $(".finder__arrival-datepicker").datepicker()
		// $(".finder__departure-datepicker").datepicker()
		$(".finder__dropdown").dropdown("guests")

		// $(".search__dates-datepicker").datepicker({ multi: true })
		$(".search__comfort-dropdown").dropdown("comfort")

		// $(".room__datepicker").datepicker({ multi: true })
		$(".room__dropdown").dropdown("comfort")
		
		const items: DoughnutObject[] = [
			{
				value: 130,
				color: ["#FFBA9C", "#FFE39C"],
				title: "Великолепно"
			},
			{
				value: 65,
				color: ["#66D2EA", "#6FCF97"],
				title: "Хорошо"
			},
			{
				value: 65,
				color: ["#8BA4F9", "#BC9CFF"],
				title: "Удовлетворительно"
			},
			{
				value: 0,
				color: ["#3D4975", "#909090"],
				title: "Разочарован"
			},
		]

		$(".details__doughnut").doughnut(items)
	})

	// The rest of the code goes here!
})(jQuery, window, document)
// The global jQuery object is passed as a parameter
