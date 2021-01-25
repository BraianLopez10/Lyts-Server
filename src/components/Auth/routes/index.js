const express = require("express");
const passport = require("passport");
const AuthController = require("../index");
const routes = express();
const SchemaValid = require("../../../middleware/checkSchema");
const joiSchemas = require("../../../schema/schemaJoi");

routes.post(
  "/signup",
  SchemaValid(joiSchemas.SchemaCreateUser, "body"),
  (req, res, next) => AuthController.signUp(req, res, next)
);
routes.post(
  "/signin",
  SchemaValid(joiSchemas.SchemaLoginUser, "body"),
  passport.authenticate("local", { session: false }),
  (req, res, next) => AuthController.signIn(req, res, next)
);

routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    AuthController.signInProvider(req, res, next);
  }
);

module.exports = routes;
