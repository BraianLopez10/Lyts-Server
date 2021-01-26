const response = require("../../../utils/response");
module.exports = function LikeController(LikeService) {
  async function create(req, res, next) {
    const { id } = req.params;
    const idUser = req.user;
    try {
      const Like = await LikeService.create(id, idUser);
      response(res, "Like created", Like, 201);
    } catch (error) {
      next(error);
    }
  }
  async function deleteLike(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await LikeService.deleteLike(id, req.user);
      if (!resp) return response(res, "Like no found", resp, 404);
      response(res, "Like deleted", resp._id, 200);
    } catch (error) {
      next(error);
    }
  }
  return {
    create,
    deleteLike,
  };
};
