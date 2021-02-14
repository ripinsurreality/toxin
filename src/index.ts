import "@/styles/styles.sass"
import "@modules/slider/slider"
import "@modules/dropdown/dropdown"
import "inputmask/dist/jquery.inputmask.min"
import "inputmask/dist/bindings/inputmask.binding"

const newItems: ItemType[] = [
	"Какие удобства",
	["Спальня", "Спальни", "Спален"],
	{
		title: ["Кровать", "Кровати", "Кроватей"],
		value: 1,
	},
	{
		title: ["Ванная комната", "Ванные комнаты", "Ванных комнат"],
		value: 2,
	},
]

// IIFE - Immediately Invoked Function Expression
;(function ($, window, document) {
	// console.log($)
	// console.log(jQuery)
	// The $ is now locally scoped

	// Listen for the jQuery ready event on the document
	$(function () {
		$(":input").inputmask()
		// console.log(
		// 	$(".slider-wrapper").slider({
		// 		min: 100,
		// 		max: 201,
		// 		step: 10,
		// 	})
		// )

		$(".drop-me").dropdown(...newItems)
	})

	// The rest of the code goes here!
})(jQuery, window, document)
// The global jQuery object is passed as a parameter
