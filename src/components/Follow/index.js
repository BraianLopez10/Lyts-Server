const FollowService = require("../../services/follow");
const FollowController = require("./controller");

module.exports = FollowController(FollowService);
