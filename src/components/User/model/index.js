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
    follows: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "user",
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

UserSchema.pre("findOne", async function () {
  this.populate({ path: "posts" }).populate({
    path: "follows",
    select: "-password",
  });
});
module.exports = mongoose.model("user", UserSchema);
