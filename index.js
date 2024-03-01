require("./server/loger");
const http = require('http');
const express = require('express');
const cors = require("cors");
const path = require("path");
const sqlite = require("better-sqlite3");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const SqliteStore = require("better-sqlite3-session-store")(session);
const { authVerifuSid, authVerifu, regUser } = require("./server/function");
const sessionList = require("./server/sessionList");
const { db } = require("./server/engine");



const app = express();
const sessiondb = new sqlite("sessions.db");
app.use(cors({origin:"http://localhost:3001"}));
app.use(session({
    secret: 'admin',
    resave: true,
    saveUninitialized: true,
    store: new SqliteStore({
      client: sessiondb, 
      expired: {
            clear: true,
            intervalMs: (60000*60*24)
        }
    })
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());
const server = http.createServer(app);



app.get("/", (req, res)=> {
    res.sendFile(__dirname+'/dist/index.html');
});
app.post("/verifu", async(req, res)=> {
    const user = await authVerifuSid(req.session.id);

    if(user!==false) res.send(user);
    else res.send({});
});
app.post("/auth", async(req, res)=> {
    const user = await authVerifu(req.body.login, req.body.password, req.session.id);

    res.send(user);
});
app.post("/reg", async(req, res)=> {
    const result = await regUser(req.body.login, req.body.password);

    res.send(result);
});
app.post("/getShopData", async(req, res)=> {
    res.send(await db.get('products'));
});
app.post("/setShopingCart", async(req, res)=> {
    sessionList.setShopingCart(req.session.id, req.body.shopingCart);
    res.send(await sessionList.getShopingCart(req.session.id));
});
app.post("/getShopingCart", async(req, res)=> {
    res.send(await sessionList.getShopingCart(req.session.id));
});
app.post('/upload', (req, res)=> {
    const { image } = req.files;
    image.mv(__dirname + '/src/upload/' + image.name);
});



app.use('/', express.static(path.join(__dirname, '/dist')));
server.listen(3000, ()=> console.log("start 3000"));