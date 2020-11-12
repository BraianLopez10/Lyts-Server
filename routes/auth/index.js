const express = require("express");
const Auth = require("../../controllers/auth");
const passport = require("passport");
const RouterAuth = express.Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");

RouterAuth.post("/signup", Auth.signUp);
RouterAuth.post("/signin", Auth.signIn);
RouterAuth.post("/facebook", Auth.signUpFacebook);

module.exports = RouterAuth;
