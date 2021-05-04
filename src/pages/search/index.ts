import "./index.sass"
import "@modules/dropdown/dropdown"
import "@modules/datepicker/datepicker"
import "@modules/card/card"
;(function ($, window, document) {
	$(function () {
		$(".search__comfort").dropdown("comfort")
		$(".search__guests").dropdown("guests")
		const rooms = [
			{
				number: 888,
				price: 9900,
				lux: true,
				reviews: 145,
				img: "search1.png",
				stars: 5,
			},
			{
				number: 840,
				price: 9900,
				reviews: 65,
				img: "search2.png",
				stars: 4,
			},
			{
				number: 980,
				price: 8500,
				lux: true,
				reviews: 35,
				img: "search3.png",
				stars: 3,
			},
			{
				number: 856,
				price: 7300,
				reviews: 19,
				img: "search4.png",
				stars: 5,
			},
			{
				number: 740,
				price: 6000,
				reviews: 44,
				img: "search5.png",
				stars: 4,
			},
			{
				number: 982,
				price: 5800,
				reviews: 56,
				img: "search6.png",
				stars: 3,
			},
			{
				number: 672,
				price: 5500,
				reviews: 45,
				img: "search7.png",
				stars: 5,
			},
			{
				number: 450,
				price: 5300,
				reviews: 39,
				img: "search8.png",
				stars: 4,
			},
			{
				number: 350,
				price: 5000,
				reviews: 77,
				img: "search9.png",
				stars: 3,
			},
			{
				number: 666,
				price: 5000,
				reviews: 25,
				img: "search10.png",
				stars: 5,
			},
			{
				number: 444,
				price: 5000,
				reviews: 15,
				img: "search11.png",
				stars: 3,
			},
			{
				number: 352,
				price: 5000,
				reviews: 55,
				img: "search12.png",
				stars: 3,
			},
		]
		$(".search__rooms").card({
			number: "888",
			price: 9900,
			lux: true,
			reviews: 145,
			images: ["search1.png",/*  "search2.png" */],
		})
		$(".search__dates").datepicker({ multi: true })
	})
})(jQuery, window, document)
