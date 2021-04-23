import "@/styles/styles.sass"
import "@modules/slider/slider"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
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
		
		
	})

	// The rest of the code goes here!
})(jQuery, window, document)
// The global jQuery object is passed as a parameter
