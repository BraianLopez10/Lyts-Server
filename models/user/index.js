const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      maxlength: 20,
      minlength: 8,
      index: true,
      unique: true,
    },
    facebookId: {
      type: String,
      default: "",
      index: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 30
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
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    lastConnection: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true }
);

schema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("follows", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
});

schema.virtual("numSeguiendo", {
  ref: "follow",
  localField: "_id",
  foreignField: "user",
  count: true,
});
schema.virtual("numSeguidores", {
  ref: "follow",
  localField: "_id",
  foreignField: "follow",
  count: true,
});
schema.pre("save", function (next) {
  bcrypt.hash(this.password || Date.now().toString(), 2).then((hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("findOne", async function () {
  this.populate("posts")
    .populate("numSeguiendo")
    .populate("numSeguidores")
    .populate({
      path: "follows",
      select: "follow -_id -user",
      populate: {
        path: "follow",
        select: "userName img lastConnection",
      },
    });
});
module.exports = mongoose.model("user", schema);
