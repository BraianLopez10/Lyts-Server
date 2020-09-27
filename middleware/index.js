const moment = require("moment");

const jwt = require("jsonwebtoken");

let middlewares = {
  checkLogin: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(500).send({ message: "La cabezara no tiene el token" });
    }

    let token = req.headers.authorization.split(" ")[1];

    let payload = jwt.decode(token, process.env.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "El token ha expirado" });
    }

    req.user = payload.sub;

    next();
  },
};

module.exports = middlewares;
