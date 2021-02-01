const response = require("../../../utils/response");
module.exports = function PostController(PostService) {
  async function create(req, res, next) {
    const { titlePost } = req.body;

    try {
      const postCreated = await PostService.create(
        req.user,
        titlePost,
        req.file.location
      );
      response(res, "Post created", postCreated, 201);
    } catch (error) {
      next(error);
    }
  }
  async function deleteP(req, res, next) {
    const idUser = req.user;
    const { id: idPost } = req.params;
    try {
      const resp = await PostService.deleteP(idUser, idPost);
      response(res, "Borrado correctamente", idPost, 200);
    } catch (err) {
      next(err);
    }
  }
  async function getAll(req, res, next) {
    try {
      const posts = await PostService.getAll();
      response(res, "All posts", posts, 200);
    } catch (error) {
      next(error);
    }
  }
  async function getById(req, res, next) {
    const { id } = req.params;
    try {
      const post = await PostService.getById(id, req.user);
      response(res, "Post", post, 200);
    } catch (error) {
      next(error);
    }
  }

  //Likes
  async function createLike(req, res, next) {
    const { id } = req.params;
    const idUser = req.user;
    try {
      const Like = await PostService.createLike(id, idUser);
      response(res, "Like created", Like, 201);
    } catch (error) {
      next(error);
    }
  }
  async function deleteLike(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await PostService.deleteLike(id, req.user);
      if (!resp) return response(res, "Like no found", resp, 404);
      response(res, "Like deleted", resp, 200);
    } catch (error) {
      next(error);
    }
  }

  //Comment
  async function createComment(req, res, next) {
    const { id: idPost } = req.params;
    const { content, username, img } = req.body;
    const comment = {
      content,
      user: req.user,
      username,
      img,
    };
    try {
      const resp = await PostService.createComment(idPost, comment);
      response(res, "New Comment", resp);
    } catch (error) {
      next(error);
    }
  }
  async function deleteComment(req, res, next) {
    const { id: idPost } = req.params;
    const { idComment } = req.body;
    try {
      const resp = await PostService.deleteComment(idPost, idComment);
      response(res, "Delete Comment", resp);
    } catch (error) {
      next(error);
    }
  }

  return {
    createComment,
    deleteComment,
    create,
    createLike,
    deleteLike,
    getAll,
    deleteP,
    getById,
  };
};
