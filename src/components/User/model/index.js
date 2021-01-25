const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: 40,
      minlength: 5,
      index: true,
      unique: true,
    },
    googleId: {
      type: String,
      default: "",
      index: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 30,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "https://lyts-10.s3-sa-east-1.amazonaws.com/profile_default.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    lastConnection: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true, versionKey: false }
);

UserSchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "user",
});
UserSchema.virtual("follows", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("numSeguiendo", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
  count: true,
});
UserSchema.virtual("numSeguidores", {
  ref: "follow",
  localField: "_id",
  foreignField: "follow",
  count: true,
});

UserSchema.pre("save", function (next) {
  // Se genera una contraseña en casa de que no tenga porque los usuarios
  // registrados por facebook no tiene una contraseña
  const saltValue = bcrypt.genSaltSync(5);
  const hashed = bcrypt.hashSync(
    this.password || Date.now() + "abcd1",
    saltValue
  );
  this.password = hashed;
  next();
});

UserSchema.pre("findOne", async function () {
  this.populate({ path: "posts" });
  // .populate("numSeguiendo")
  // .populate("numSeguidores");
  // .populate({
  //   path: "follows",
  //   model: "follow",
  //   select: "follow -_id -user",
  //   populate: {
  //     path: "follow",
  //     select: "username img lastConnection",
  //   },
  // });
});
module.exports = mongoose.model("User", UserSchema);
