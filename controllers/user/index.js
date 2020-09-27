const UserModel = require("../../models/user");

async function getAllUsers(req, res) {
  try {
    const seguidores = await UserModel.find(null, { password: 0 })
      .nor([{ _id: req.user }])
      .populate({
        path: "follows",
        select: "follow",
        populate: {
          path: "follow",
          select: "userName img",
        },
      });

    console.log(" SEGUIDORES -------> ", seguidores);

    const resultDoc = await UserModel.find(null, { password: 0 }).nor([
      { _id: req.user },
    ]);
    res.status(200).json(resultDoc);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function getUser(req, res) {
  const user = req.params.user;
  if (!user) return res.status(500).send();
  try {
    const userData = await UserModel.findOne({ _id: user }, { password: 0 })
    console.log(userData);
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).send();
  }
}
async function getUserLogged(req, res) {
  const user = req.user;
  if (!user) return res.status(404).send();
  try {
    const userData = await UserModel.findOne({ _id: user }, { password: 0 })
    console.log("user logged", userData);
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).send();
  }
}
async function getUserByUserName(req, res) {
  const user = req.params.userName;
  if (user === "") return res.status(404).send();
  try {
    const userData = await UserModel.findOne(
      { userName: user },
      { password: 0 }
    )
    if (userData) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    return res.status(500).send();
  }
}
async function updateUser(req, res) {
  const { name, bio } = req.body;
  const user = req.user;

  console.log("actualizando perfil", req.body, req.file);

  let datosAGuardar = {};
  if (req.file) {
    datosAGuardar.img = req.file.location;
  }
  if (name !== "") {
    datosAGuardar.name = name;
  }

  if (bio !== "") {
    datosAGuardar.bio = bio;
  }

  if (Object.keys(datosAGuardar).length > 0) {
    UserModel.findOneAndUpdate({ _id: user }, { ...datosAGuardar })
      .then((doc) => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).send();
      });
  } else {
    return res.status(200).send();
  }
}
async function searchUser(req, res) {
  const user = req.params.userName;

  console.log(req.params);

  if (!user) return res.status(404).send();

  try {
    const userData = await UserModel.find(
      { userName: { $regex: user, $options: "i" } },
      "userName img",
      {
        limit: 10,
      }
    );
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
}
async function toFollow(req, res) {

  const user = req.user;
  try {

    const userData = await UserModel.findOne({ _id: user })

    let follows = userData.follows;

    let arraysId = follows.map((f) => {
      return f.follow._id
    })

    let
      friendOfFollowers = await UserModel.find({ _id: arraysId }, { select: follows }).populate({
        path: "follows",
        select: "follow -_id -user",
        limit: 6,
        populate: {
          path: "follow",
          select: "userName img _id"
        }
      })

    //Solo extrae el posible seguidor
    let toFollows = [];
    friendOfFollowers.map((v) => {
      v.follows.map((v1) => {
        //Si esta el usuario se elimina
        if (v1.follow._id != req.user) {
          toFollows.push(v1.follow)
        }
      })
    })

    //Filtrar que los posibles seguidores no sean a los q el usuario sigue
    let filter1 = [];
    toFollows.map((valor) => {
      let esta = arraysId.find((v) => JSON.stringify(v) === JSON.stringify(valor._id))
      if (!esta) {
        filter1.push(valor);
      }
    })

    //Filtra en caso de que haya repetidos
    let filtradoToFollows = filter1.filter((value, indiceActual, arreglo) => {
      return arreglo.findIndex((v) => JSON.stringify(v) === JSON.stringify(value)) === indiceActual
    })

    if (filtradoToFollows.length === 0)
      filtradoToFollows = await UserModel.find({ _id: { $ne: user } }).limit(15)

    res.send(filtradoToFollows)

  } catch (err) {
    res.status(500).send(err);
  }

}

module.exports = {
  getAllUsers,
  getUser,
  getUserByUserName,
  updateUser,
  searchUser,
  toFollow,
  getUserLogged
};
