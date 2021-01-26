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
      const response = await PostService.deleteP(idUser, idPost);
      response(res, "Borrado correctamente", null, 200);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async function getAll(req, res, next) {
    console.log("get");
    try {
      const posts = await PostService.getAll();
      response(res, "All posts", posts, 200);
    } catch (error) {
      next(error);
    }
  }
  async function getById(req, res, next) {
    const { id } = req.params;
    const post = await PostService.getById(id, req.user);
    response(res, "Post", post, 200);
  }
  // async function getPostById(req, res) {
  //   const post_id = req.params.post_id;
  //   if (!post_id) return res.status(500).send();

  // async function feed(req, res) {
  //   const user = req.user;

  //   if (user === "") return res.status(500).send();

  //   let allFollows = await followModel.find({ user });

  //   let idPosts = allFollows.map((r) => r.follow);

  //   idPosts.push(req.user);

  //   postModel
  //     .find({ user: idPosts })
  //     .sort({ createdAt: "desc" })
  //     .populate({ path: "user", select: "userName img" })
  //     .populate({
  //       path: "comments",
  //       select: "content createdAt",
  //       options: { sort: { createdAt: "desc" } },
  //       populate: {
  //         path: "user",
  //         select: "userName",
  //       },
  //     })
  //     .then((posts) => {
  //       return getLikeInPost(user, posts);
  //     })
  //     .then((posts) => {
  //       res.json(posts);
  //     });
  // }

  // async function getAll(req, res) {
  //   try {
  //     let post = await postModel
  //       .find()
  //       .populate({ path: "user", select: "userName img" });
  //     return res.status(200).json(post);
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }

  // //Resuelve si un post tiene un like del usuario
  // async function getLikeInPost(user_id, posts) {
  //   const idsPosts = posts.map((post) => post._id);

  //   return likeModel
  //     .find({ user: user_id, post: { $in: idsPosts } })
  //     .then((likes) => {
  //       const idsPostsConLikes = likes.map((like) => like.post);

  //       posts.forEach((post) => {
  //         if (idsPostsConLikes.some((id) => id.equals(post._id))) {
  //           post.isLike = true;
  //         }
  //       });
  //       return posts;
  //     });
  // }

  return {
    create,
    // getPostById,
    // feed,
    getAll,
    deleteP,
    getById,
  };
};
