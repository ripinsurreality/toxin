import "./index.sass"
import "@modules/dropdown/dropdown"

;(function ($, window, document) {
	$(function () {
		$(".finder__dropdown").dropdown("guests")
	})
})(jQuery, window, document)
