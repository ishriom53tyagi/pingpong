const express = require("express");
const compression = require("compression");
const cors = require("cors");
const requestIp = require("request-ip");
const app = express();
const helmet = require("helmet");
let cookieParser = require("cookie-parser");

const mongoConnect = require("./app/utils/mongoDatabase").mongoConnect;
const apiRoutes = require("./app/routes");

const config = require("./config/config.json");

const port = process.argv[2] || config.port;

const options = {
  allowedHeaders: ["Origin", "Content-Type", "Accept"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.options("*", cors(options));
app.use(cookieParser());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(requestIp.mw());
app.use(helmet());
app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.write("Server Started");
  res.end();
});

if (!module.parent) {
  mongoConnect(() => {
    app.listen(port);
    console.log(port);
  });
}

module.exports = app;
