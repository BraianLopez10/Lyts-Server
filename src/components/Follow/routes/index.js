const Router = require("express").Router();
const FollowController = require("../index");

Router.get("/", (req, res) => {
  res.status(200).send("hola follow");
});

module.exports = Router;
