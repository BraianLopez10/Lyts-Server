const responseSuccess = require("../../../utils/response");
const boom = require("@hapi/boom");

module.exports = function AuthController(authService) {
  async function signUp(req, res, next) {
    const param = req.body;
    try {
      const existUser = await authService.getUser({
        username: param.username,
      });
      if (existUser) {
        next(boom.badRequest("El usuario ya esta registrado"));
      }
      const newUser = {
        name: param.name,
        email: param.email,
        username: param.username,
        password: param.password,
      };
      const userSaved = await authService.userCreate(newUser);
      delete userSaved._doc.password;
      return responseSuccess(res, "Registrado correctamente", userSaved, 201);
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
