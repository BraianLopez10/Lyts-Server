const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  async function genHashed(password) {
    let pass;
    if (!password) {
      pass = Date.now();
    } else {
      pass = password;
    }
    const saltValue = bcrypt.genSaltSync(5);
    const hashed = bcrypt.hashSync(pass, saltValue);
    return hashed;
  }

  async function createGoogle(data) {
    const newUser = new userModel(data);
    let userN = await newUser.save();
    delete userN._doc.password;
    return Promise.resolve(userN);
  }
  async function userCreate(data) {
    const existUser = await getUser({
      username: data.username,
    });
    if (existUser) {
      return Promise.reject("El usuario ya esta registrado");
    }
    const hashed = await genHashed(data.password);
    const toCreate = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: hashed,
    };
    const newUser = new userModel(toCreate);
    let userN = await newUser.save();
    delete userN._doc.password;
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
    delete user._doc.password;
    return Promise.resolve({
      error: false,
      data: {
        token,
        user,
      },
    });
  }

  return {
    login,
    userCreate,
    getUser,
    genHashed,
    createGoogle,
  };
};
