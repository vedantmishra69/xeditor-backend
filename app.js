const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressWs = require("express-ws");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const backendIp = process.env.BACKEND_IP;

const options = {
  cert: fs.readFileSync(`/etc/letsencrypt/live/${backendIp}/fullchain.pem`),
  key: fs.readFileSync(`/etc/letsencrypt/live/${backendIp}/privkey.pem`),
};

const expressApp = express();
const server = https.createServer(options, expressApp);
require("dotenv").config();

const { app } = expressWs(expressApp, server);

const indexRouter = require("./routes/index.route");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = server;
