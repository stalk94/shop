import { hookstate } from '@hookstate/core';



export default hookstate({
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
    shopingCart: []
});