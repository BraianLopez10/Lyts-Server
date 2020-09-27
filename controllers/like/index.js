const postModel = require("../../models/post");
const likeModel = require("../../models/likes");

function like(req, res) {
  const post = req.body.data.post;

  const user = req.user;

  console.log("LIKE");

  postModel
    .findById(post)
    .then((post) => {
      if (post) {
        //Encontrar like y ver si esta persona ya le dio like una vez

        return likeModel
          .findOne({ user, post })
          .then((like) => {
            //Si no tiene like se crea el like se guarda
            if (!like) {
              const newLike = new likeModel({
                post,
                user,
              });

              newLike.save().then(() => {
                postModel.findById(post).then((post) => {
                  post.numLikes = post.numLikes + 1;

                  post.update(post).then((post) => {
                    res.status(200).json({ message: "Like con exito", post });
                  });
                });
              });
            } else {
              res.status(401).json({ message: "Ya tiene tu like" });
            }
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        return res.status(400).json({
          error: "El posts no existe",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
}

function disLike(req, res) {
  console.log("UNLIKE");
  const post = req.params.idPost;
  const user = req.user;
  return postModel
    .findById(post)
    .then((post) => {
      if (post) {
        //Encontrar like y ver si esta persona ya le dio like una vez

        return likeModel.findOne({ user, post }).then((like) => {
          //Si no tiene like se crea el like se guarda
          if (like) {
            like.remove().then(() => {
              postModel.findById(post).then((post) => {
                post.numLikes = post.numLikes - 1;

                post.update(post).then(() => {
                  res.status(200).json({ message: "DisLike con exito" });
                });
              });
            });
          } else {
            res.status(401).json({ message: "Ya tiene tu like" });
          }
        });
      } else {
        return res.status(400).json({
          error: "El posts no existe",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
}

module.exports = {
  like,
  disLike,
};
