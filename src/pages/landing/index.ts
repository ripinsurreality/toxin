import "./index.sass"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "@modules/nav/nav"

;(function ($, window, document) {
	$(function () {
		$(".finder__dropdown").dropdown("guests")
		$(".finder__arrival-datepicker").datepicker()
		$(".finder__departure-datepicker").datepicker()
	})
})(jQuery, window, document)
