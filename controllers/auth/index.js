"use strict";
const UserModel = require("../../models/user");
const moment = require("moment");
const passport = require("passport");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  console.log("CREANDO USUARIO...");
  const param = req.body;

  console.log(param);
  try {
    const existUser = await UserModel.countDocuments({
      userName: param.userName,
    });
    if (existUser) {
      return res.status(422).json({ messague: "El usuario ya existe" });
    }
    const newUser = new UserModel({
      name: param.name,
      email: param.email,
      userName: param.userName,
      password: param.password,
    });

    await newUser.save({ password: 0 });
    console.log("USUARIO CREADO");
    return res.status(201).json({ messague: "Te has registrado con éxito" });
  } catch (err) {
    console.log("CREANDO USUARIO FALLO");

    return res.status(404).send();
  }
}

function signIn(req, res) {
  passport.authenticate("local", { session: false }, (err, data, info) => {
    console.log("Logueando");
    if (err || !data) {
      console.log(err, data);
      return res.status(401).json(info);
    }
    const payload = {
      sub: data._id,
      exp: moment().add("1", "hour").unix(),
    };
    let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
    //Temporal;
    // data.notifications = [];
    return res.status(200).json({
      token,
      user: data,
    });
  })(req, res);
}

function siginFacebook(req, res) {
  passport.authenticate("facebook-token", { session: false }, function (
    err,
    user,
    info
  ) {
    console.log(err);
    if (!user) {
      return res.status(401).json({ massge: "User not authenticated" });
    }
    const payload = {
      sub: user._id,
      expr: moment().add("1", "hour").unix(),
    };

    let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
    req.token = token;

    res.setHeader("x-auth-token", req.token);
    res.status(200).json(user);
  })(req, res);
}
module.exports = {
  signUp,
  signIn,
  siginFacebook,
};
