const mongoose = require("mongoose");

let dbUri;

if (process.env.NODE_ENV === 'development') {
  dbUri = 'mongodb://127.0.0.1:27017'
}else{
  dbUri = process.env.DB_URI
}

mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

module.exports = mongoose;
