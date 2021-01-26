const likeModel = require("../../components/Like/model");
const commentModel = require("../../components/Comment/model");

module.exports = function PostService(postModel) {
  async function create(idUser, titlePost = "", file) {
    const newPost = new postModel({
      user: idUser,
      caption: titlePost,
      img: file,
    });
    const postCreated = await newPost.save();
    return Promise.resolve(postCreated);
  }
  async function get(idPost) {
    const post = await postModel.findOne({ _id: idPost });
    return Promise.resolve(post);
  }
  async function deleteP(idUser, idPost) {
    const post = await get(idPost);
    if (!post) {
      return Promise.reject("Post no encontrado");
    }
    if (post.user != idUser) return Promise.reject("Unauthorized");

    await post.remove();
    return Promise.resolve();
  }
  async function getAll() {
    let post = await postModel
      .find()
      .populate({ path: "user", model: "user", select: "username img  " });
    return Promise.resolve(post);
  }
  async function getById(idPost, idUser) {
    const post = await postModel.findOne({ _id: idPost });
    const numLikes = await likeModel.where({ post: idPost }).count();
    if (idUser) {
      const isLikeFromUser = await likeModel
        .where({ post: idPost, user: idUser })
        .count();
      if (isLikeFromUser > 0) {
        post.isLike = true;
      } else {
        post.isLike = false;
      }
    } else {
      post.isLike = false;
    }
    const numComment = await commentModel.where({ post: idPost }).count();
    post._doc.numLikes = numLikes;
    post._doc.numComment = numComment;
    return Promise.resolve(post);
  }
  return {
    create,
    deleteP,
    get,
    getAll,
    getById,
  };
};
