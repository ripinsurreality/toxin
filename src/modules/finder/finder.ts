import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
;(function ($, window, document) {
	$(function () {
		$(".finder__dropdown").dropdown("guests")
		$(".finder__datepicker").datepicker({ multi: true, multiSplit: true })
	})
})(jQuery, window, document)
