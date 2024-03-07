const { db } = require("./engine");
const sessionList = require("./sessionList");



exports.authVerifuSid =async(sid)=> {
    const loginFindResult = await sessionList.get(sid);

    if(loginFindResult!==false){
        let user = await db.get("users."+loginFindResult);
        delete user.password;
        return user;
    }
    else return false;
}
exports.authVerifu =async(login, password, sid)=> {
    if(login && password && sid){
        let user = await db.get("users."+login);
        if(user && user.password===password) {
            sessionList.set(sid, login);
            delete user.password;
            return user;
        }
        else {
            logger.error(`🔐 Ошибка авторизации пользователя ${login}, error authVerifu lvl 2`);
            return {error: "error password or login"};
        }
    }
    else {
        logger.error(`🔐 Ошибка авторизации пользователя ${login}, error authVerifu lvl 1`);
        return {error: "В доступе отказано invalid login or password"};
    }
}
exports.regUser =async(login, pass)=> {
    if(pass.length < 6 && pass.length > 35) return {error:"password minimum 6 simbol, max 35"};
    if(login.length < 5 && login.length > 22) return {error:"login minimum 5 simbol, max 22"};
    else {
        const newUser = await db.get("users."+login);
        if(newUser) {
            logger.error(`📝 Ошибка регистрации нового пользователя ${login}, имя пользователя уже зарегистрированно в системе.`);
            return {error:"пользователь с таким логином уже зарегестрирован"};
        }
        else {
            await db.set("users."+login, {
                login: login,
                password: pass,
                id: Object.keys(await db.get("users")).length + 1,
                online: false,
                avatar: undefined,
                permision: 2,
                story: [],
                cupons: []
            });
            return {};
        }
    }
}
exports.products = {
    async add(data) {
        const productsId = await db.add('GUID', 1);
        data.id = productsId;
        data.timeshtamp = new Date().getTime();
        await db.push('products', data);
        return await db.get('products');
    },
    async read(data) {
        const result = [];
        const products = await db.get('products');
        products.forEach((element)=> {
            if(element.id===data.id) result.push(data);
            else result.push(element);
        });
        await db.set('products', result);

        return result;
    },
    async delete(data) {
        const products = await db.get('products');
        const filter = products.filter((elem)=> elem.id!==data.id);
        await db.set('products', filter);

        return products;
    }
}