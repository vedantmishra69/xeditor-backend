const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressWs = require("express-ws");
const cors = require("cors");
const http = require("http");
const expressApp = express();
const server = http.createServer(expressApp);

const { app } = expressWs(expressApp, server);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = server;
