const UserController = require("./controller");
const UserService = require("../../services/user");

module.exports = UserController(UserService);
