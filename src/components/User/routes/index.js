const Router = require("express").Router();
const UserController = require("../index");
const passport = require("passport");
const joiSchemas = require("../../../schema/schemaJoi");
const SchemaValid = require("../../../middleware/checkSchema");
const multer = require("multer");
const handleUpload = require("../../../libs/multer-s3");
const upload = handleUpload.single("img");

Router.get("/", (req, res, next) => UserController.getAll(req, res, next));
Router.get(
  "/feed",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => UserController.getFeed(req, res, next)
);
Router.get(
  "/logged",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => UserController.getDatalogged(req, res, next)
);
Router.get(
  "/explorer",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => UserController.getExplorer(req, res, next)
);
Router.get("/:username", (req, res, next) =>
  UserController.get(req, res, next)
);
Router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          next(boom.badRequest(err.code));
        }
        next(err);
      } else if (err) {
        next(err);
      }
      next();
    });
  },
  (req, res, next) => UserController.update(req, res, next)
);
Router.post(
  "/follow/:id",
  SchemaValid(joiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => UserController.addFollow(req, res, next)
);
Router.delete(
  "/follow/:id",
  SchemaValid(joiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => UserController.deleteFollow(req, res, next)
);

module.exports = Router;
