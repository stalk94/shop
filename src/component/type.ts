export type Option = {
    name: string
    type: 'array'|'radio'|'any'|'bool'|'color'
    category: string
    value: Array<string | number> | string 
}

export type Tovar = {
    id: number
    code: string
    count: number
    name: string
    description: string
    text: string
    image: string
    images: Array<string>
    price: number
    category: string
    status: 'new'|'action'|'favorite'
    timeshtamp: string|number
    options?: Array<Option>
}

export type ShowcaseProps = {
    products: Array<Tovar>
    template: (item: Tovar)=> React.ReactNode
    header: string
}

export type LeftContainerProps = {
    useView: (value: 'base'|'category'|'products'|'action'|'orders'|'options')=> void
}

export type ImageContainerProps = {
    images: Array<string>
    image: string
    useImage: (src: string)=> void
    useImages: (images: Array<string>)=> void
}

export type TravelMethod = {
    id: number
    label: string
    description: string
}

export type PayMethod = {
    id: number
    travelId: number
    label: string
    description: string
}

export type Order = {
    id: number
    timeshtamp: number
    author: string
    telephone: string
    massage: string
    status: 'create' | 'panding' | 'complete' | 'travel' | 'cancel'
    data: Array<Tovar>
    adress?: string
    travel?: TravelMethod   // id выбранного способа доставки
    pay?: PayMethod         // id выбранного способа оплаты
}