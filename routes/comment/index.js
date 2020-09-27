const express = require("express");

const RouterComentario = express.Router();

const comentarioController = require("../../controllers/comment");

RouterComentario.post("/", comentarioController.agregarComentario);

RouterComentario.delete("/", comentarioController.eliminarComentario);

module.exports = RouterComentario;
