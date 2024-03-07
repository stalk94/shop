import { hookstate } from '@hookstate/core';


export default hookstate({
    logo: undefined,
    settings: {
        localisation: 'ua',
        tovarLayout: 'grid',
        cooper: 'newCompany',
        category: [{
            label: 'Главная',
        },{
            label: 'Авто',
            icon: 'car'
        },{
            label: 'Детали',
            icon: 'eat'
        },{
            label: 'Прочее',
            icon: 'gear'
        }]
    },
    products: [{
        id: 1000,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: '',
        images: ["bamboo-watch.jpg"],
        price: 65,
        category: "Прочее",
        status: 'new'
    },{
        id: 1001,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: '',
        images: ["bamboo-watch.jpg"],
        price: 65,
        category: "Прочее",
        status: 'new'
    },{
        id: 1002,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        images: ["bamboo-watch.jpg"],
        image: '',
        price: 65,
        category: "Прочее",
        status: 'new'
    },{
        id: 1003,
        count: 1,
        image: '',
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        images: ["bamboo-watch.jpg"],
        price: 65,
        category: "Прочее",
        status: 'new'
    }],
    shopingCart: [{
        id: 1000,
        count: 1,
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: ["bamboo-watch.jpg"],
        price: 65,
        category: "Прочее",
        status: true
    }]
});

export const user = hookstate({
    login: 'test',
    telephone: '',
    permision: 0,
    pays: []
});

export const flags = hookstate({
    view: 'admin',
    category: undefined,
    viewAuth: false,
    viewAuthType: 'auth',
    bodyView: 'main'
});