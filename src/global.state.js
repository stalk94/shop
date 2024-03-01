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
            icon: 'pi pi-fw pi-car'
        },{
            label: 'Детали',
            icon: 'pi pi-fw pi-wrench'
        },{
            label: 'Прочее',
            icon: 'pi pi-fw pi-box'
        }]
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

export const user = hookstate({
    login: 'test',
    telephone: '',
    permision: 0,
    pays: []
});

export const flags = hookstate({
    view: 'category',
    category: undefined,
    viewAuth: false,
    viewAuthType: 'auth',
    bodyView: 'main'
});