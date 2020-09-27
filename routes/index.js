const express = require("express");

const user = require("./user");

const post = require("./post");

const like = require("./like");

const comment = require("./comment");

const follow = require("./follow");

const router = express.Router();

router.use("/comment", comment);
router.use("/user", user);
router.use("/like", like);
router.use("/post", post);
router.use("/follow", follow);

module.exports = router;
