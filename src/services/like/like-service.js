module.exports = function LikeService(LikeModel) {
  async function create(idPost, idUser) {
    const newLike = new LikeModel({
      user: idUser,
      post: idPost,
    });
    const likeCraeted = await newLike.save();
    return Promise.resolve(likeCraeted);
  }
  async function deleteLike(idPost, idUser) {
    const like = await LikeModel.findOneAndRemove({
      post: idPost,
      user: idUser,
    });
    return Promise.resolve(like);
  }
  return {
    create,
    deleteLike,
  };
};
