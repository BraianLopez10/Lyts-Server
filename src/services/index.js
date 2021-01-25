const jwb = require("jsonwebtoken");
const moment = require("moment");
const config = require("../../config");

exports.createToken = function(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(30, "minutes")
      .unix()
  };
  const token = jwb.sign(payload, config.TOKEN_SECRET);

  return token;
};
