const UserController = require("./controller");
const UserService = require("../../services/user-service");

module.exports = new UserController(new UserService());
