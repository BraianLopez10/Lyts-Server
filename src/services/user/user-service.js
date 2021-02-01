const UserModel = require("../../components/User/model");
const PostService = require("../../services/post");
module.exports = function UserService(userModel) {
  async function getAll() {
    const users = await userModel.find(null, { password: 0 });
    return Promise.resolve(users);
  }
  async function getDatalogged(idUser) {
    const data = await userModel.findById(idUser, { password: 0 });
    return Promise.resolve(data);
  }
  async function get(username) {
    const user = await userModel.findOne({ username }, { password: 0 });
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(false);
    }
  }
  async function update(valuesToUpdate, idUser, fileLocation) {
    try {
      const user = await userModel.findOne({ _id: idUser });
      Object.keys(valuesToUpdate).map((k) => {
        user[k] = valuesToUpdate[k];
      });
      if (fileLocation) {
        user.img = fileLocation;
      }
      const updated = await user.save();
      return Promise.resolve(updated);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async function addFollow(idToFollow, idUser) {
    const userToFollow = await userModel.findById(idToFollow);
    if (userToFollow) {
      delete userToFollow._doc.password;
      const user = await userModel.findById(idUser);
      user.follows.push(idToFollow);
      await user.save();
      return Promise.resolve(userToFollow);
    } else {
      return Promise.reject("No existe user");
    }
  }
  async function removeFollow(idToFollow, idUser) {
    const userToFollow = await userModel.findById(idToFollow);
    if (userToFollow) {
      delete userToFollow._doc.password;
      const user = await userModel.findByIdAndUpdate(idUser, {
        $pull: { follows: idToFollow },
      });
      return Promise.resolve(userToFollow);
    } else {
      return Promise.reject("No existe user");
    }
  }
  async function getFeed(idUser) {
    const user = await UserModel.findById(idUser);
    const follows = user.follows;
    const idFollows = follows.map((f) => f._id);
    const postsFollow = await getPostFollow(idFollows, idUser);
    const toFollow = await getToFollow(idFollows, idUser);
    const postUser = await PostService.findByUsers(idUser);
    return {
      follows,
      postsFollow,
      toFollow,
      postUser,
    };
  }
  async function getPostFollow(idFollows, idUser) {
    const posts = await PostService.findByUsers(idFollows);
    //Check if have like's user
    posts.forEach((p, index) => {
      p.comments.reverse();
      if (p.likes.includes(idUser)) {
        p._doc.isLike = true;
      } else {
        p._doc.isLike = false;
      }
    });
    return posts;
  }
  async function getToFollow(idFollows, idUser) {
    //Agregamos nuestro id para que no encuentre nuestro user
    idFollows.push(idUser);
    const users = await userModel.find(
      {
        _id: { $nin: idFollows },
      },
      { password: 0 }
    );
    return users;
  }
  async function getExplorer() {
    const posts = await PostService.getAll();
    const users = await getAll();
    return Promise.resolve({
      posts,
      users,
    });
  }
  return {
    getAll,
    get,
    update,
    addFollow,
    getFeed,
    getDatalogged,
    removeFollow,
    getExplorer,
  };
};
