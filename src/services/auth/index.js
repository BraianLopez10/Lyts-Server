const AuthService = require("./auth-service");
const UserModel = require("../../components/User/model");

module.exports = AuthService(UserModel);
