const responseSuccess = require("../../../utils/response");
const response = require("../../../utils/response");

module.exports = function UserController(userService) {
  async function getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return response(res, "Todos los users", users, 200);
    } catch (err) {
      next(err);
    }
  }
  async function get(req, res, next) {
    try {
      const { username } = req.params;
      const user = await userService.get(username);
      return response(res, "User", user, 200);
    } catch (error) {
      next(error);
    }
  }

  async function update(req, res, next) {
    try {
      const body = req.body;
      const result = await userService.update(body, req.user);
      response(res, "Actualizado", result, 200);
    } catch (err) {
      next(err);
    }
  }

  return {
    getAll,
    get,
    update,
  };
};
