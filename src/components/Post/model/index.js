const mongoose = require("mongoose");
const likeModel = require("../../Like/model");
const commentModel = require("../../Comment/model");

const schemaPost = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    caption: {
      type: String,
      maxlength: 180,
    },
    img: {
      type: String,
      required: true,
    },
    numLikes: {
      type: Number,
      min: 0,
      default: 0,
    },
    numComentarios: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true, versionKey: false }
);

schemaPost
  .virtual("isLike")
  .get(function () {
    if (this._isLike == null) {
      return false;
    }
    return this._isLike;
  })
  .set(function (v) {
    this._isLike = v;
  });
schemaPost.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
});
schemaPost.post("remove", async function () {
  let comments = await commentModel.find({ post: this._id });
  comments.forEach(async (comment) => {
    await comment.remove();
  });
  let likes = await likeModel.find({ post: this._id });
  likes.forEach(async (like) => {
    await like.remove();
  });
});

module.exports = mongoose.model("post", schemaPost);
