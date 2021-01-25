const mongoose = require("mongoose");
const config = require("./config");

let dbUri = config.db.uri;
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((v) => {
    console.log("DB CONNECT");
  })
  .catch((err) => {
    console.log("DB ERROR");
  });

module.exports = mongoose;
