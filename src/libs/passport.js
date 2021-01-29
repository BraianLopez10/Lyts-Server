const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const AuthService = require("../services/auth");
const config = require("../config");
const boom = require("@hapi/boom");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const moment = require("moment");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, done) {
      if (!username || !password) return done(Error("Invalid Params"), false);
      try {
        const user = await AuthService.getUser({ username });
        if (!user) return done(boom.badRequest("Error en credenciales"), false);
        if (!bcrypt.compareSync(password, user.password))
          return done(boom.badRequest("Error en credenciales"), false);
        // Se devuelve el usuario porque la contraseña coincide y el user existe
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    function (jwt_payload, done) {
      if (jwt_payload.exp <= moment().unix()) {
        done("El token ha expirado", false);
      }
      done(false, jwt_payload.sub);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.googleAppId || "",
      clientSecret: config.google.googleAppSecret || "",
      callbackURL: "http://localhost:4000/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const userExist = await AuthService.getUser({
        googleId: profile.id,
      });
      if (userExist) return cb(false, userExist);
      const hashed = await AuthService.genHashed(profile.id);
      console.log(profile.id);
      const newUser = {
        googleId: profile.id,
        name: profile.name.givenName,
        lastname: profile.name.familyName,
        username: (profile.name.givenName.replace(" ", "") + Date.now()).slice(
          0,
          20
        ),
        password: hashed,
        email: profile.emails[0].value,
        img: profile.photos[0].value,
      };
      const userCreated = await AuthService.createGoogle(newUser);
      return cb(false, userCreated);
    }
  )
);
