"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
      session: false,
    },
    function (userName, password, done) {
      if (!userName || !passport) return done(null, false);
      return UserModel.findOne({ userName })
        .then((data) => {
          console.log(data);
          if (!data) return done(null, false);
          if (!bcrypt.compareSync(password, data.password))
            return done(null, false);

          return done(null, data);
        })
        .catch((err) => {
          console.log(err);
          return done(err, false);
        });
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      return UserModel.findOne({ facebookId: profile.id }, { password: 0 })
        .then((doc) => {
          if (doc) return done(null, doc);
          const user = {
            facebookId: profile.id,
            name: profile.displayName.split(" ")[0],
            lastname: profile.displayName.split(" ")[1],
            userName:
              profile.displayName.split(" ")[0] +
              Date.now().toString().slice(0, 5),
            email: profile.emails[0].value,
            img: profile.photos[0].value,
          };

          console.log("USER CREADO ", user);

          UserModel.create(user, { passport: 0 }).then((docCreated) => {
            return done(null, docCreated);
          });
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
