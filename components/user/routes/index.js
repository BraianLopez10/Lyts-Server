const express = require("express");
const RouterUser = express.Router();
const userController = require("../controllers/user");
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

var upload = multer({ storage });

// RouterUser.get("/", userController.getAllUsers); NO SE USA DE MOMENTO
RouterUser.get("/", userController.getUserLogged);
RouterUser.get("/tofollow", userController.toFollow);
RouterUser.get("/:user", userController.getUser);
RouterUser.patch("/", upload.single("img"), userController.updateUser); //ACTUALIZA USUARIO
RouterUser.get("/username/:userName", userController.getUserByUserName); //OBTIENE UN USUARIO POR USERNAME
RouterUser.get("/search/:userName", userController.searchUser); //BUSCA A UN USUARIO

module.exports = RouterUser;
