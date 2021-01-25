const mongoose = require("mongoose");

const schemaLike = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: " post",
    },
  },
  { id: false, timestamps: true, versionKey: false }
);

module.exports = mongoose.model("like", schemaLike);
