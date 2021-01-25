const commentModel = require("../../models/comment");

const postModel = require("../../models/post");

function agregarComentario(req, res) {
  console.log("Agregando Comentario...");
  const user = req.user;
  const post = req.body.post;
  const content = req.body.content;

  if (user === "" || post === "" || content === "")
    return res.status(500).send();

  const newComment = new commentModel({
    user,
    post,
    content,
  });

  postModel
    .findById(post)
    .then((post) => {
      if (post) {
        newComment
          .save()
          .then((comment) => {
            postModel
              .findOneAndUpdate({ _id: post }, { $inc: { numComentarios: 1 } })
              .then(() => {
                console.log(comment);
                res.status(200).json(comment);
              });
          })
          .catch((err) => {
            console.log(err);

            res.status(500).json(err);
          });
      } else {
        res.status(400).json({ message: "El post no existe" });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json(err);
    });

  return res;
}

async function eliminarComentario(req, res) {
  console.log("Eliminando Comentario");
  const post = req.body.post;
  const user = req.user;
  const comentario = req.body.comentario;

  if (post === "" || user === "" || comentario === "")
    return res.status(500).send();
  if (await postModel.exists({ _id: post })) {
    commentModel
      .findById(comentario)
      .then((comment) => {
        if (comment) {
          if (comment.user == user) {
            postModel
              .findOneAndUpdate({ _id: post }, { $inc: { numComentarios: -1 } })
              .then(() => {
                comment.remove().then(() => {
                  res
                    .status(200)
                    .json({ message: "Comentario eliminado correctamente" });
                });
              });
          } else {
            res.status(401).json({ message: "No es tu comentario" });
          }
        } else {
          res.status(400).json({ message: "Comentario no existe" });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json(err);
      });
  } else {
    res.status(500).json({ error: "El Post no existe" });
  }

  return res;
}

module.exports = {
  agregarComentario,
  eliminarComentario,
};
