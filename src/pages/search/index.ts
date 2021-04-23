import "./index.sass"
import "@modules/dropdown/dropdown"

;(function ($, window, document) {
	$(function () {
		// $(".search__dates-datepicker").datepicker({ multi: true })
		$(".search__comfort-dropdown").dropdown("comfort")
	})
})(jQuery, window, document)
