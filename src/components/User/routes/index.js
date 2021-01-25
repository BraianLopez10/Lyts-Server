const Router = require("express").Router();
const UserController = require("../index");
const passport = require("passport");
const joiSchemas = require("../../../schema/schemaJoi");
const SchemaValid = require("../../../middleware/checkSchema");
const handleUpload = require("../../../libs/multer-s3");

Router.get("/", (req, res, next) => UserController.getAll(req, res, next));
Router.get("/:username", (req, res, next) =>
  UserController.get(req, res, next)
);
Router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  SchemaValid(joiSchemas.SchemaBodyUpdateUser, "body"),
  (req, res, next) => UserController.update(req, res, next)
);

// // RouterUser.get("/", userController.getAllUsers); NO SE USA DE MOMENTO
// RouterUser.get("/", userController.getUserLogged);
// RouterUser.get("/tofollow", userController.toFollow);
// RouterUser.get("/:user", userController.getUser);
// RouterUser.patch("/", upload.single("img"), userController.updateUser); //ACTUALIZA USUARIO
// RouterUser.get("/username/:userName", userController.getUserByUserName); //OBTIENE UN USUARIO POR USERNAME
// RouterUser.get("/search/:userName", userController.searchUser); //BUSCA A UN USUARIO

module.exports = Router;
