import "./index.sass"
import "@modules/doughnut/doughnut"

;(function ($, window, document) {
	$(function () {
		const items: DoughnutObject[] = [
			{
				value: 130,
				color: ["#FFBA9C", "#FFE39C"],
				title: "Великолепно",
			},
			{
				value: 65,
				color: ["#66D2EA", "#6FCF97"],
				title: "Хорошо",
			},
			{
				value: 65,
				color: ["#8BA4F9", "#BC9CFF"],
				title: "Удовлетворительно",
			},
			{
				value: 0,
				color: ["#3D4975", "#909090"],
				title: "Разочарован",
			},
		]

		$(".details__doughnut").doughnut(items)
	})
})(jQuery, window, document)
