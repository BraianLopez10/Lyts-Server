const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("./libs/passport");
const routesApi = require("./routes");
const routesAuth = require("./components/Auth/routes");
const handleError = require("./middleware/handleError");

const app = express();
require("./db");
//Config
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());

//Routes
app.use("/auth", routesAuth);
app.use("/api/v1", routesApi);
app.use(handleError.wrapWithBoom);
app.use(handleError.handleError);

module.exports = app;
