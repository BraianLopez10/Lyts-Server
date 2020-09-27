const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://braianlopez:${process.env.DB_PASS}@cluster0.1k17z.mongodb.net/${proccess.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

module.exports = mongoose;
