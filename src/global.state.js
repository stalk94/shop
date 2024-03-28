import { hookstate } from '@hookstate/core';


export default hookstate({
    logo: undefined,
    settings: {
        crm: undefined,
        localisation: 'ua',
        tovarLayout: 'grid',
        cooper: 'newCompany',
        travels: [{
            id: 0,
            label: 'Самовывоз',
            description: 'Самовывоз с нашего склада в хащах'
        }],
        pays: [{
            id: 0,
            travelId: 0,
            label: 'Наложенный платеж',
            description: 'Оплата почкой при получении'
        }],
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
        count: 15,
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
        count: 0,
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
    }],
    orders: [{
        id: 0,
        timeshtamp: '14.03.2024 18:40',
        author: 'test',
        telephone: '0000',
        status: 'create',
        massage: 'тест 1',
        data: [{
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
    },{
        id: 1,
        timeshtamp: '14.03.2024 18:39',
        author: 'test',
        telephone: '0000',
        status: 'travel',
        massage: 'тест',
        data: [{
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