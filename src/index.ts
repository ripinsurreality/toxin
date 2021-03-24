import "@/styles/styles.sass"
import "@modules/slider/slider"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "inputmask/dist/jquery.inputmask.min"
import "inputmask/dist/bindings/inputmask.binding"
import dayjs from "dayjs"
import Chart from "chart.js"

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

const guests: ItemType[] = ["Сколько гостей", "Взрослые", "Дети", "Младенцы"]

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

		$(".dropdown-3").dropdown(...newItems)
		$(".dropdown-2").dropdown(...newItems)
		$(".dropdown-1").dropdown(...newItems)

		$(".dtpckr").datepicker({ multi: true })

		$(".finder__datepicker").datepicker({ multi: true })
		$(".finder__dropdown").dropdown(...guests)

		$(".room__datepicker").datepicker({ multi: true })
		$(".room__dropdown").dropdown(...guests)

		const canvas = document.querySelector(
			".details__pie"
		) as HTMLCanvasElement
		canvas.width = 120
		canvas.height = 120
		const ctx = canvas.getContext("2d")

		interface PieObject {
			value: number
			color: string[]
		}

		function drawPie(ctx: CanvasRenderingContext2D, items: PieObject[]) {
			const reducer = (prev: number, curr: number) => prev + curr
			const values = items.map((item) => item.value)
			const sum = values.reduce(reducer)
			function toRadian(angle: number) {
				return (Math.PI / 180) * angle
			}
			const radius = canvas.width / 2
			let lastAngle = 0
			const gap = toRadian(2)
			const strokeWidth = 5
			items.forEach((item) => {
				if (item.value > 0) {
					ctx.beginPath()
					const angle = (item.value / sum) * 2 * Math.PI
					const startAngle = toRadian(90) + lastAngle + gap
					const endAngle = toRadian(90) + lastAngle + angle - gap
					const midAngle = startAngle + (endAngle - startAngle) / 2
					ctx.arc(
						radius/*  + Math.cos(midAngle * gap) */,
						radius/*  + Math.sin(midAngle * gap) */,
						radius - strokeWidth,
						startAngle,
						endAngle
					)
					const lingrad = ctx.createLinearGradient(
						canvas.width / 2,
						canvas.height,
						canvas.width / 2,
						0
					)
					item.color.forEach((clr, i) =>
						lingrad.addColorStop(i / (item.color.length - 1), clr)
					)
					ctx.strokeStyle = lingrad
					ctx.lineWidth = strokeWidth
					ctx.stroke()
					lastAngle += angle
				}
			})
			function getWordForm(value: number, forms: [string, string, string]) {
				const cases = [2, 0, 1, 1, 1, 2]
				return forms[
					value % 100 > 4 && value % 100 < 20
						? 2
						: cases[value % 10 < 5 ? value % 10 : 5]
				]
			}
			ctx.font = "bold 24px 'Montserrat', sans-serif"
			ctx.textAlign = "center"
			ctx.fillStyle = "#BC9CFF"
			ctx.fillText(sum.toString(), canvas.width / 2, 35 + 24)
			ctx.font = "bold 12px 'Montserrat', sans-serif"
			ctx.fillText(getWordForm(sum, ["голос", "голоса", "голосов"]), canvas.width / 2, 65 + 12)
		}

		const items: PieObject[] = [
			{
				value: 130,
				color: ["#FFBA9C", "#FFE39C"],
			},
			{
				value: 65,
				color: ["#66D2EA", "#6FCF97"],
			},
			{
				value: 65,
				color: ["#8BA4F9", "#BC9CFF"],
			},
			{
				value: 0,
				color: ["#3D4975", "#909090"],
			},
		]

		if (ctx) {
			drawPie(ctx, items)
		}

		// const ctx = document.querySelector(".details__pie") as HTMLCanvasElement

		// const pie = new Chart(ctx, {
		// 	type: "pie",
		// 	data: {
		// 		labels: ["Великолепно", "Хорошо", "Удовлетворительно", "Разочарован"],
		// 		datasets: [{
		// 			data: [130, 65, 65],
		// 			backgroundColor: [
		// 				"linear-gradient(180deg, #FFE39C 0%, #FFBA9C 100%)",
		// 				"linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%)",
		// 				"linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)",
		// 				"linear-gradient(180deg, #919191 0%, #3D4975 100%)"
		// 			]
		// 		}]
		// 	}
		// })
	})

	// The rest of the code goes here!
})(jQuery, window, document)
// The global jQuery object is passed as a parameter
