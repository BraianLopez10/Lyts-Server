const mongoose = require("mongoose");

mongoose.connect("mongodb://database/lyts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
