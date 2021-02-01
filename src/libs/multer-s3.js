const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const config = require("../config");

const s3 = new aws.S3({
  accessKeyId: config.aws.awsAccessKey,
  secretAccessKey: config.aws.awsSecretKey,
});

const storage = multerS3({
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

module.exports = multer({ storage, limits: { fileSize: 5000000 } });
