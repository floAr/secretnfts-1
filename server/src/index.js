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

fetchSCRTPrice((prices) => {
    scrtprice = prices;
});

io.on("connection", (socket) => {
    clients.set(socket.id, { socket, timestamp: new Date().getTime(), id: socket.id });

    socket.on("handshake", (callback) => {
        console.log(`${socket.id} is connecting`);
        const response = {
            scrtprice
        };
        callback(response);
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
