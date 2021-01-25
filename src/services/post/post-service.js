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
    let post = await postModel.find().populate({ path: "user", model: "user" });
    return Promise.resolve(post);
  }
  return {
    create,
    deleteP,
    get,
    getAll,
  };
};
