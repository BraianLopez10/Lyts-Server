const mongoose = require("mongoose");

const schemaComment = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { id: false, timestamps: true }
);

module.exports = mongoose.model("comment", schemaComment);
