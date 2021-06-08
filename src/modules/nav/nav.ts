;(function ($) {
	const modal = $(`.nav-modal`)
	const items = $(`.nav__items`)
	const burger = $(`.nav__burger`)
	const burgerLines = $(`.nav__burger-line`)
	burger.on("click", toggleNav)
	modal.on("click", toggleNav)

	function toggleNav() {
		modal.toggleClass(`nav-modal--active`)
		items.toggleClass(`nav__items--active`)
		burgerLines.each(function () {
			$(this).toggleClass(`nav__burger-line--active`)
		})
	}

	const listItems = $(`.nav__item--list`)
	listItems.each((i, listItem) => {
		const li = $(listItem)
		const list = li.find(`.nav__list`)
		const onLiClick = (e: JQuery.ClickEvent) => {
			list.toggleClass(`nav__list--open`)
		}
		const onDocumentClick = (e: JQuery.ClickEvent) => {
			if (!(e.target instanceof HTMLElement)) {return}
			if (li.has(e.target).length > 0) {return}
			const open = list.hasClass(`nav__list--open`)
			open && list.removeClass(`nav__list--open`)
		}
		li.on("click", onLiClick)
		$(document).on("click", onDocumentClick)
	})
})(jQuery)
