require("dotenv").config();
const socketIo = require("socket.io");
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cookieParser());

require("./app/migrations/");
require("./app/routes")(app);

server.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Express server is running on port ${process.env.EXPRESS_PORT}.`);
});

module.exports = app;
