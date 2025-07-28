const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressWs = require("express-ws");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const expressApp = express();
const server = http.createServer(expressApp);
require("dotenv").config();
const { app } = expressWs(expressApp, server);

const indexRouter = require("./routes/index.route");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 250, // requests per windowMs
  skipOptions: true,
});

app.set("trust proxy", 1);

app.use(cors({ origin: process.env.SITE_URL }));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = server;
