require("./db.js");
const express = require("express");
const routes = require("./routes");
const auth = require("./routes/auth");
const middlewares = require("./middleware");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./libs/passport");
const morgan = require("morgan");
const passport = require("passport");

if (
  !process.env.AWS_ACCESS_KEY ||
  !process.env.AWS_SECRET_KEY ||
  !process.env.TOKEN_SECRET
) {
  console.log("CREDENCIALES NO SETEADAS");
  process.exit(1);
}

const app = express();
app.use(passport.initialize());
app.use(morgan("dev"));
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

app.use(bodyParser.json());

app.use("/auth/", auth);

//API
app.use("/api/v1/", middlewares.checkLogin, routes);

//Manejador de errores

module.exports = app;
