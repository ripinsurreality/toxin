import "./index.sass"
import "@modules/datepicker/datepicker"
import "@modules/nav/nav"

;(function ($, window, document) {
	$(function () {
		$(".dtpckr").datepicker({multi: true})
	})
})(jQuery, window, document)
