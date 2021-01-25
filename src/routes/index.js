const Router = require("express").Router();

const routeUser = require("../components/User/routes");
const routePost = require("../components/Post/routes");

Router.use("/user", routeUser);
Router.use("/post", routePost);

module.exports = Router;
