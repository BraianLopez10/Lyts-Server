const boom = require("@hapi/boom");
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
  async function deleteP(idUser, idPost) {
    const post = await postModel.findById(idPost);
    if (!post) {
      return Promise.reject(boom.notFound());
    }
    if (post.user._id != idUser) return Promise.reject(boom.unauthorized());
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
    const post = await postModel.findById(idPost);
    if (!post) return Promise.reject(boom.notFound());
    console.log(idUser);
    if (post.likes.includes(idUser)) {
      post._doc.isLike = true;
    } else {
      post._doc.isLike = false;
    }
    return Promise.resolve(post);
  }
  async function findByUsers(idsUsers) {
    const posts = await PostModel.find({ user: idsUsers })
      .populate("user")
      .populate("comments");
    if (!post) return Promise.reject("The post is not exist");
  }
  //Likes
  async function createLike(idPost, idUser) {
    const resp = await postModel.updateOne(
      { _id: idPost },
      { $push: { likes: idUser } }
    );
    if (resp.nModified === 1) {
      return Promise.resolve({
        idPost,
        idUser,
      });
    } else {
      return Promise.reject();
    }
  }
  async function deleteLike(idPost, idUser) {
    const resp = await postModel.updateOne(
      { _id: idPost },
      { $pull: { likes: idUser } }
    );
    if (resp.nModified === 1) {
      return Promise.resolve({
        idPost,
        idUser,
      });
    } else {
      return Promise.reject();
    }
  }
  //Comments
  async function createComment(idPost, comment) {
    const resp = await postModel.updateOne(
      { _id: idPost },
      { $push: { comments: comment } }
    );
    return Promise.resolve({
      idPost,
      comment,
    });
  }
  async function deleteComment(idPost, idComment) {
    const resp = await postModel.updateOne(
      { _id: idPost },
      { $pull: { comments: { _id: idComment } } }
    );
    return Promise.resolve({
      idPost,
      idComment,
    });
  }
  return {
    createComment,
    deleteComment,
    createLike,
    deleteLike,
    create,
    deleteP,
    getAll,
    getById,
    findByUsers,
  };
};
