const AuthService = require("../../services/auth");
const AuthController = require("./controller");
module.exports = AuthController(AuthService);
