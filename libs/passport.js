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
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await UserModel.findOne(
          { facebookId: profile.id },
          { password: 0 }
        );
        if (user) return done(null, user);

        //Creamos el usuario
        let newUser = new UserModel({
          facebookId: profile.id,
          name: profile.displayName,
          lastname: profile.displayName.split(" ")[1],
          userName:
            profile.displayName.replace(" ", "") +
            Date.now().toString().slice(0, 5),
          email: profile.emails[0].value,
          img: profile.photos[0].value,
        });

        await newUser.save({ password: 0 });

        let userSavedWithData = await UserModel.findOne(
          { facebookId: profile.id },
          { password: 0 }
        );
        return done(null, userSavedWithData);
      } catch (err) {
        console.log(err);
        return done("Error", null);
      }
    }
  )
);
