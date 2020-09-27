const mongoose = require("mongoose");

mongodb+srv://braianlopez:<password>@cluster0.1k17z.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://braianlopez:${process.env.DB_PASS}@cluster0.1k17z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
