import "./index.sass"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "@modules/card/card"
;(function ($, window, document) {
	$(function () {
		$(".search__comfort").dropdown("comfort")
		$(".search__guests").dropdown("guests")
		const rooms: CardProps[] = [
			{
				number: 888,
				price: 9900,
				lux: true,
				reviews: 145,
				images: ["search1.png"],
				rating: 5,
			},
			{
				number: 840,
				price: 9900,
				reviews: 65,
				images: ["search2.png"],
				rating: 4,
			},
			{
				number: 980,
				price: 8500,
				lux: true,
				reviews: 35,
				images: ["search3.png"],
				rating: 3,
			},
			{
				number: 856,
				price: 7300,
				reviews: 19,
				images: ["search4.png"],
				rating: 5,
			},
			{
				number: 740,
				price: 6000,
				reviews: 44,
				images: ["search5.png"],
				rating: 4,
			},
			{
				number: 982,
				price: 5800,
				reviews: 56,
				images: ["search6.png"],
				rating: 3,
			},
			{
				number: 672,
				price: 5500,
				reviews: 45,
				images: ["search7.png"],
				rating: 5,
			},
			{
				number: 450,
				price: 5300,
				reviews: 39,
				images: ["search8.png"],
				rating: 4,
			},
			{
				number: 350,
				price: 5000,
				reviews: 77,
				images: ["search9.png"],
				rating: 3,
			},
			{
				number: 666,
				price: 5000,
				reviews: 25,
				images: ["search10.png"],
				rating: 5,
			},
			{
				number: 444,
				price: 5000,
				reviews: 15,
				images: ["search11.png"],
				rating: 3,
			},
			{
				number: 352,
				price: 5000,
				reviews: 55,
				images: ["search12.png"],
				rating: 3,
			},
		]
		rooms.forEach((room) => {
			$(".search__rooms").card(room)
		})
		$(".search__dates").datepicker({ multi: true })
	})
})(jQuery, window, document)
