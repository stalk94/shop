const { db } = require("./engine");



module.exports = {
    async set(sid, login) {
        await db.set('sessions.'+login, sid);
    },
    async get(sid) {
        const cache = await db.get('sessions');
        const findIndex = Object.values(cache).findIndex((userSid)=> userSid === sid);

        if(findIndex!==-1) return Object.keys(cache)[findIndex];
        else return false;
    },
    async remove(login) {
        db.delete('sessions.'+login);
    },
    async getShopingCart(sid) {
        const cache = await db.get('sessionsShopingCart.'+sid);

        if(cache) return cache;
        else {
            this.setShopingCart(sid, []);
            return [];
        }
    },
    async setShopingCart(sid, shopingCart) {
        await db.set('sessionsShopingCart.'+sid, shopingCart);
    }
}