;(function ($) {
	const modal = $(`.nav-modal`)
	const items = $(`.nav__items`)
	const burger = $(`.nav__burger`)
	const burgerLines = $(`.nav__burger-line`)
	burger.on("click", toggle)
	modal.on("click", toggle)

	function toggle() {
		modal.toggleClass(`nav-modal--active`)
		items.toggleClass(`nav__items--active`)
		burgerLines.each(function() {
			$(this).toggleClass(`nav__burger-line--active`)
		})
		// burger.toggleClass(`nav__burder--active`)
	}
})(jQuery)
