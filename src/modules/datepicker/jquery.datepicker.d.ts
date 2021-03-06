interface DatepickerProps {
	date?: object
	multi?: boolean
}

interface JQuery {
	datepicker({}?: DatepickerProps): JQuery
}