const responseSuccess = require("../../../utils/response");
const boom = require("@hapi/boom");

module.exports = function AuthController(authService) {
  async function signUp(req, res, next) {
    const data = req.body;
    try {
      const newUser = await authService.userCreate(data);
      return responseSuccess(res, "Registrado correctamente", newUser, 201);
    } catch (err) {
      next(err);
    }
  }

  async function signIn(req, res, next) {
    try {
      const result = await authService.login(req.user);
      responseSuccess(res, "", result.data, 200);
    } catch (err) {
      next(err);
    }
  }

  async function signInProvider(req, res, next) {
    try {
      const result = await authService.login(req.user);
      res.set("token", result.token);
      return res;
      responseSuccess(res, "", result.data, 200);
    } catch (err) {
      next(err);
    }
  }

  return {
    signUp,
    signIn,
    signInProvider,
  };
};
