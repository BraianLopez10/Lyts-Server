module.exports = function UserService(userModel) {
  async function getAll() {
    const users = await userModel.find(null, { password: 0 });
    return Promise.resolve(users);
  }
  async function get(username) {
    const user = await userModel.findOne(
      { username: username },
      { password: 0 }
    );
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(false);
    }
  }
  async function update(valuesToUpdate, idUser) {
    try {
      const user = await userModel.findOne({ _id: idUser });
      Object.keys(valuesToUpdate).map((k) => {
        user[k] = valuesToUpdate[k];
      });
      const updated = await user.save();
      return Promise.resolve(updated);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  return {
    getAll,
    get,
    update,
  };
};
