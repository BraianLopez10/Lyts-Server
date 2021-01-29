const Router = require("express").Router();

const routeUser = require("../components/User/routes");
const routePost = require("../components/Post/routes");
const routeLike = require("../components/Like/routes");

Router.use("/user", routeUser);
Router.use("/post", routePost);
Router.use("/like", routeLike);

module.exports = Router;
