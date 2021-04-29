import "./index.sass"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"

;(function ($, window, document) {
	$(function () {
		$(".finder__dropdown").dropdown("guests")
		$(".finder__arrival-datepicker").datepicker()
		$(".finder__departure-datepicker").datepicker()
	})
})(jQuery, window, document)
