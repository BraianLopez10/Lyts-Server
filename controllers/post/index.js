const postModel = require("../../models/post");
const followModel = require("../../models/follows");
const likeModel = require("../../models/likes");
const commentModel = require("../../models/comment");
const { CloudFormation } = require("aws-sdk");

async function agregarPost(req, res) {
  const { titlePost } = req.body;

  if (!req.file && !titlePost) return res.status(500).send();
  let newPost = new postModel({
    user: req.user,
    caption: titlePost,
    img: req.file.location,
  });

  console.log(newPost);

  newPost.save().then((resolve) => {
    return res.status(200).json({ message: "Imagen guardada" });
  });
}

async function getPostById(req, res) {
  const post_id = req.params.post_id;
  if (!post_id) return res.status(500).send();
  postModel
    .findById(post_id)
    .populate("user", "name img userName")
    .populate({
      path: "comments",
      select: " content createdAt ",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "user",
        select: "userName img",
      },
    })
    .then((post) => {
      console.log(post);
      if (post) {
        //se pasa a un array para poder procesarlo en la funcion getLikeInPost()
        let postInArray = [];
        postInArray.push(post);
        return getLikeInPost(req.user, postInArray).then((post) => {
          return res.json(post);
        });
      } else {
        console.log("Develve 404");
        return res.status(404).send();
      }
    })
    .catch((err) => {
      return res.status(500).send();
    });
}

async function feed(req, res) {
  const user = req.user;

  if (user === "") return res.status(500).send();

  let allFollows = await followModel.find({ user });

  let idPosts = allFollows.map((r) => r.follow);

  idPosts.push(req.user);

  postModel
    .find({ user: idPosts })
    .sort({ createdAt: "desc" })
    .populate({ path: "user", select: "userName img" })
    .populate({
      path: "comments",
      select: "content createdAt",
      options: { sort: { createdAt: "desc" } },
      populate: {
        path: "user",
        select: "userName",
      },
    })
    .then((posts) => {
      return getLikeInPost(user, posts);
    })
    .then((posts) => {
      res.json(posts);
    });
}

async function getAll(req, res) {
  try {
    let post = await postModel
      .find()
      .populate({ path: "user", select: "userName img" });
    return res.status(200).json(post);
  } catch (e) {
    return res.status(500).json(e);
  }
}

//Resuelve si un post tiene un like del usuario
async function getLikeInPost(user_id, posts) {
  const idsPosts = posts.map((post) => post._id);

  return likeModel
    .find({ user: user_id, post: { $in: idsPosts } })
    .then((likes) => {
      const idsPostsConLikes = likes.map((like) => like.post);

      posts.forEach((post) => {
        if (idsPostsConLikes.some((id) => id.equals(post._id))) {
          post.isLike = true;
        }
      });
      return posts;
    });
}

async function deletePost(req, res) {
  console.log("Eliminando post ....");
  const idUser = req.user;
  const idPost = req.body.id_post;
  console.log(req.body, "ID: " + idPost);
  try {
    const post = await postModel.findById({ _id: idPost });
    console.log(post);
    if (!post) return res.status(404).json({ massage: "No encontrado" });
    if (post.user != idUser)
      return res.status(401).json({ massage: "No es tu post" });
    await post.remove();
    return res.status(200).send();
  } catch {
    return res.status(500).json({ massage: "No se borro correctamente" });
  }
}

module.exports = {
  agregarPost,
  getPostById,
  feed,
  getAll,
  deletePost,
};
