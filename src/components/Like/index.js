const LikeService = require("../../services/like");
const LikeController = require("./controller");
module.exports = LikeController(LikeService);
