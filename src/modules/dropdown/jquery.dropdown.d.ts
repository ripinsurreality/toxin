interface ItemObj {
	title: string | [string, string, string]
	value: number
}

type ItemType = string | [string, string, string] | ItemObj

interface JQuery {
	dropdown(...items: ItemType[]): JQuery
}