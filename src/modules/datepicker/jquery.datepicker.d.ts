interface DatepickerProps {
	date?: Dayjs
	multi?: boolean
}

interface JQuery {
	datepicker({}?: DatepickerProps): JQuery
}