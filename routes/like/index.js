const express = require("express");
const RouterLike = express.Router();
const likeController = require("../../controllers/like");

RouterLike.post("/", likeController.like);
RouterLike.delete("/:idPost", likeController.disLike);

module.exports = RouterLike;
