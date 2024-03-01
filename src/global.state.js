import { hookstate } from '@hookstate/core';



export default hookstate({
    logo: undefined,
    localisation: 'ua',
    settings: {
        tovarLayout: 'grid'
    },
    products: [{
        id: 1000,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Прочее",
        status: true
    }],
    user: {},
    shopingCart: [{
        id: 1000,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Прочее",
        status: true
    }]
});

export const flags = hookstate({
    viewShopingBar: false,
    viewAuth: false,
    viewAuthType: 'auth',
    bodyView: 'main'
});