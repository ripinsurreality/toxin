interface DatepickerProps {
	date?: Dayjs
	multi?: boolean
}

interface JQuery {
	datepicker(props?: DatepickerProps): JQuery
}