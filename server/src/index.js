require("dotenv").config();
global.fetch = require('node-fetch')

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const { fetchSCRTPrice } = require("./utils");
const mongo = require("mongodb").MongoClient;
const { secretConnection } = require("./secret");

const app = express();
const limiter = rateLimit({ windowMs: 1000, max: 65 });
app.use(helmet());
app.use(limiter);
app.use(cors());
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


const clients = new Map();
let scrtprice = [];
global.databse = null;
global.dbcollections = null;
global.secretjs = null;

console.log('db', process.env.MONGODB_URL)
mongo.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err, client) => {
        if (err) return console.error(err);
        const database = client.db("secretnfts");
        global.database = database;
        global.dbcollections = database.collection("collections");
        global.secretjs = await secretConnection();
        console.log('global.secretjs', global.secretjs)
        //global.dbcollections.remove({}, function (err, removed) { });
        try {
            const info = await global.secretjs.txById("709011805998EF49A4FA68FB1EAE9AFF75702F13B700B1ABA3166DEACC03BD13");
            console.log('info', info)
        } catch (error) {

        }
        fetchSCRTPrice((prices) => {
            scrtprice = prices;
        });
    }
);




io.on("connection", (socket) => {
    clients.set(socket.id, { socket, timestamp: new Date().getTime(), id: socket.id });

    socket.on("handshake", (callback) => {
        console.log(`${socket.id} is connecting`);
        const response = {
            scrtprice
        };
        callback(response);
    });

    socket.on("searchData", (params, callback) => {
        global.dbcollections.findOne({ "address": address }, (err, result) => {
            callback(result)
        });
    });


    socket.on("getCollection", (address, callback) => {
        global.dbcollections.findOne({ "address": address }, (err, result) => {
            callback(result)
        });
    });

    socket.on("getCollections", (params, callback) => {
        const query = params.from ? { "from": params.from } : {}
        const limit = params.limit || 10
        const ascending = params.ascending ? 1 : -1

        global.dbcollections.find(query).sort({ _id: ascending }).limit(limit).toArray(function (err, result) {
            callback(result || [])
        });
    });


    socket.on("createCollection", (name, symbol, address, from, callback) => {
        const collection = {
            name,
            symbol,
            address,
            from
        }

        global.dbcollections.insertOne(collection, (err) => {
            callback({ error: false, collection });
        });

    });

    socket.on("disconnect", function () {
        clients.delete(socket.id);
    });

});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;
server.listen(port, "0.0.0.0", (err) => {
    if (err) { return console.log(err.stack); }
    return console.log(`server is listening on ${port}`);
});
