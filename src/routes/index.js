const Router = require("express").Router();

const routeUser = require("../components/User/routes");
const routePost = require("../components/Post/routes");
const routeFollow = require("../components/Follow/routes");
const routeLike = require("../components/Like/routes");

Router.use("/user", routeUser);
Router.use("/post", routePost);
Router.use("/follow", routeFollow);
Router.use("/like", routeLike);

module.exports = Router;
