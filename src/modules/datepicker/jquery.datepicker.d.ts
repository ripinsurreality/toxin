interface DatepickerProps {
	date?: Dayjs
	multi?: boolean
	multiSplit?: boolean
}

interface JQuery {
	datepicker(props?: DatepickerProps): JQuery
}