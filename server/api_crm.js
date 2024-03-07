const { db } = require("./engine");
const CryptoJS = require('crypto-js');
const { fetch } = require("cross-fetch");


/**
 * API для синхронизации с crm
 */
module.exports = {
    async send(method, params) {
        if(!this.crm) this.crm = await db.get('settings.crm');

        if(this.crm.url) return fetch(this.crm.url + 'api', {
            key: this.crm.key,
            data: {
                method: method,
                params: params
            }
        });
        else console.log('crm not connect');
    },
    async addContact(name, telephone) {
        this.send('addContact', {name:name, telephone:telephone});
    },
    createLid() {
        const sign = CryptoJS.AES.encrypt(new Date().getTime().toString(), 'test').toString();
        this.send('addLid', {
            signature: sign
        });

        return sign;
    },
    async closeLid(signature) {
        this.send('closeLid', {
            signature: signature
        });
    }
}