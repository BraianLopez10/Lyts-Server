const postService = require("../../services/post");
const PostController = require("./controller");

module.exports = PostController(postService);
