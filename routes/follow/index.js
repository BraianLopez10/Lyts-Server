const express = require("express");

const RouterFollow = express.Router();

const followController = require("../../controllers/follow");

RouterFollow.post("/", followController.follow);
RouterFollow.delete("/", followController.unFollow);

module.exports = RouterFollow;
