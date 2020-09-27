const express = require("express");

const RouterPost = express.Router();
const postController = require("../../controllers/post");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

let storage = multerS3({
  s3: s3,
  bucket: "lyts-10",
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    let extension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now().toString() + "." + extension);
  },
});

let upload = multer({ storage });

RouterPost.post("/", upload.single("img"), postController.agregarPost);
RouterPost.get("/feed", postController.feed);
RouterPost.get("/:post_id", postController.getPostById);
RouterPost.get("/", postController.getAll);
RouterPost.delete("/", postController.deletePost);

module.exports = RouterPost;
