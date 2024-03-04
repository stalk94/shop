export type Tovar = {
    id: number
    code: string
    count: number
    name: string
    description: string
    image: string
    price: number
    category: string
    status: 'new'|'action'|'favorite'
    timeshtamp: string|number
}

export type ShowcaseProps = {
    products: Array<Tovar>
    template: (item: Tovar)=> React.ReactNode
    header: string
}