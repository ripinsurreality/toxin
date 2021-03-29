interface ItemObj {
	title: ItemStringType
	value: number
}

type ItemStringType = string | [string, string, string]

type ItemType = ItemStringType | ItemObj

interface JQuery {
	dropdown(type: "guests" | "comfort", values?: number[]): JQuery
}
