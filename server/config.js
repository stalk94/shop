const { db } = require("./engine");


db.set('sessions', {});
db.set('users', {});
db.set('sessionsShopingCart', {});
db.set('products', []);
db.set('pays', []);
db.set('logs', {
    error: [],
    info: [],
    warn: []
});
db.set('settings', {
    crm: {
        key: undefined, 
        url: undefined
    },
    localisation: 'ua',
    tovarLayout: 'grid',
    category: []
});