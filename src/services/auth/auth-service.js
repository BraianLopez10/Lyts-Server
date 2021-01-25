const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = function AuthService(userModel) {
  async function getUser(query) {
    const user = await userModel.findOne(query);
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(false);
    }
  }
  async function userCreate(user) {
    const newUser = new userModel(user);
    let userN = await newUser.save();
    return Promise.resolve(userN);
  }
  function buildToken(data) {
    const payload = {
      sub: data._id,
      exp: moment().add("5", "hour").unix(),
    };
    let token = jwt.sign(JSON.stringify(payload), config.jwt.secret);
    return token;
  }
  async function login(user) {
    const token = buildToken(user._id);
    return Promise.resolve({
      error: false,
      data: {
        token,
        user: {
          username: user.username,
          id: user._id,
        },
      },
    });
  }

  return {
    login,
    userCreate,
    getUser,
  };
};
