import "@/styles/styles.sass"
import "@modules/slider/slider"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "inputmask/dist/jquery.inputmask.min"
import "inputmask/dist/bindings/inputmask.binding"
import dayjs from "dayjs"

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

const guests: ItemType[] = [
	"Сколько гостей",
	"Взрослые",
	"Дети",
	"Младенцы"
]

// IIFE - Immediately Invoked Function Expression
;(function ($, window, document) {
	// console.log($)
	// console.log(jQuery)
	// The $ is now locally scoped

	// Listen for the jQuery ready event on the document
	$(function () {
		$(":input").inputmask()
		console.log(
			$(".slider-wrapper").slider({
				min: 100,
				max: 201,
				step: 10,
			})
		)

		$(".dropdown-3").dropdown(...newItems)
		$(".dropdown-2").dropdown(...newItems)
		$(".dropdown-1").dropdown(...newItems)

		$(".dtpckr").datepicker({ multi: true })

		$(".finder__datepicker").datepicker({ multi: true })
		$(".finder__dropdown").dropdown(...guests)
	})

	// The rest of the code goes here!
})(jQuery, window, document)
// The global jQuery object is passed as a parameter
