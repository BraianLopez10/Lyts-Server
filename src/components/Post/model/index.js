const mongoose = require("mongoose");

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
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
    },
    comments: {
      type: [
        {
          content: String,
          user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
          },
          img: String,
          username: String,
          createdAt: {
            type: mongoose.SchemaTypes.Date,
            default: Date.now(),
          },
        },
      ],
    },
    img: {
      type: String,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true, versionKey: false }
);
schemaPost.virtual("isLike").set(function (v) {
  this._isLike = v;
});
schemaPost.pre("findOne", function () {
  this.populate({ path: "user", select: "username , img" });
});
module.exports = mongoose.model("post", schemaPost);
