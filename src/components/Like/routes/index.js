const router = require("express").Router();
const LikeController = require("../index");
const passport = require("passport");
const SchemaValid = require("../../../middleware/checkSchema");
const JoiSchemas = require("../../../schema/schemaJoi");

router.post(
  "/:id",
  SchemaValid(JoiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => LikeController.create(req, res, next)
);
router.delete(
  "/:id",
  SchemaValid(JoiSchemas.SchemeIdParam, "params"),
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => LikeController.deleteLike(req, res, next)
);

module.exports = router;
