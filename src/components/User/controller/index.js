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
    console.log(req.body);
    console.log(req.file);
    try {
      const body = req.body;
      let fileLocation;
      if (req.file) {
        fileLocation = req.file.location;
      }
      const result = await userService.update(body, req.user, fileLocation);
      response(res, "Actualizado", result, 200);
    } catch (err) {
      next(err);
    }
  }

  async function addFollow(req, res, next) {
    const { id: idToFollow } = req.params;
    const idUser = req.user;
    try {
      const newFollow = await userService.addFollow(idToFollow, idUser);
      response(res, "Follows", newFollow);
    } catch (err) {
      next(err);
    }
  }
  async function deleteFollow(req, res, next) {
    const { id: idToFollow } = req.params;
    const idUser = req.user;
    try {
      const deletedFollow = await userService.removeFollow(idToFollow, idUser);
      response(res, "Follows", deletedFollow);
    } catch (err) {
      next(err);
    }
  }
  async function getDatalogged(req, res, next) {
    const idUser = req.user;
    try {
      const data = await userService.getDatalogged(idUser);
      response(res, "Data user Logged", data, 200);
    } catch (error) {
      next(error);
    }
  }
  async function getFeed(req, res, next) {
    const idUser = req.user;
    console.log("Feed");
    try {
      const feed = await userService.getFeed(idUser);
      response(res, "Feed", feed, 200);
    } catch (error) {
      next(error);
    }
  }
  async function getFollow(req, res, next) {}

  async function getExplorer(req, res, next) {
    try {
      const data = await userService.getExplorer();
      response(res, "Explorer data", data, 200);
    } catch (error) {
      next(error);
    }
  }

  return {
    getAll,
    get,
    getDatalogged,
    update,
    addFollow,
    deleteFollow,
    getFollow,
    getFeed,
    getExplorer,
  };
};
