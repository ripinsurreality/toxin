import "./index.sass"
import "@modules/datepicker/datepicker"

;(function ($, window, document) {
	$(function () {
		$(".dtpckr").datepicker({multi: true})
	})
})(jQuery, window, document)
