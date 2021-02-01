const Router = require("express").Router();
const PostController = require("../index");
const joiSchemas = require("../../../schema/schemaJoi");
const SchemaValid = require("../../../middleware/checkSchema");
const handleUpload = require("../../../libs/multer-s3");
const passport = require("passport");
const multer = require("multer");
const boom = require("@hapi/boom");

const upload = handleUpload.single("img");
Router.post(
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
  (req, res, next) => PostController.create(req, res, next)
);
Router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.createLike(req, res, next)
);
Router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.createComment(req, res, next)
);
Router.delete(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.deleteComment(req, res, next)
);
Router.delete(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.deleteLike(req, res, next)
);
Router.delete(
  "/:id",
  SchemaValid(joiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.deleteP(req, res, next)
);
Router.get("/", (req, res, next) => PostController.getAll(req, res, next));
Router.get(
  "/:id",
  SchemaValid(joiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => PostController.getById(req, res, next)
);

module.exports = Router;
