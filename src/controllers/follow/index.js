const userModel = require("../../models/user");
const followModel = require("../../models/follows");

async function follow(req, res) {
  const user = req.user;
  const follow = req.body.follow;

  console.log("Follow", req.body);

  if (user === "" || follow === "") return res.status(500).send();

  try {
    if (await userModel.exists({ _id: user })) {
      //Se comprueba si lo sigue o no lo sigue
      const isFollow = await followModel.findOne({ user, follow });
      if (!isFollow) {
        const newFollow = new followModel({
          user,
          follow
        });
        const followNew = await newFollow.save();
        return res.status(200).json(followNew);
      } else {
        return res.status(400).json({ message: "Ya sigues al usuario" });
      }
    } else {
      return res.status(404).json({ message: "Usuario no existe" });
    }
  } catch (err) {
    return res.status(500).send();
  }
}

async function unFollow(req, res) {
  const user = req.user;
  const follow = req.body.follow;

  console.log("UnFollow", req.body);

  if (user === "" || follow === "") return res.status(500).send();

  try {
    if (await userModel.exists({ _id: user })) {
      //Se comprueba si lo sigue o no lo sigue
      const isFollow = await followModel.findOne({ user, follow });
      if (isFollow) {
        await isFollow.remove();

        return res.status(200).json("Dejaste de seguir al usuario");
      } else {
        return res.status(400).json({ message: "No sigues al usuario" });
      }
    } else {
      return res.status(404).json({ message: "Usuario no existe" });
    }
  } catch (err) {
    return res.status(500).send();
  }
}

module.exports = {
  follow,
  unFollow,
};
