require("dotenv").config();
module.exports = {
  jwt: {
    secret: process.env.TOKEN_SECRET || "thatsecret",
  },
  aws: {
    awsAccessKey: process.env.AWS_ACCESS_KEY || "thatsecret",
    awsSecretKey: process.env.AWS_SECRET_KEY,
  },
  db: {
    uri:
      process.env.NODE_ENV === "development"
        ? "mongodb://db/lyts"
        : process.env.DB_URI,
  },
  google: {
    googleAppId: process.env.GOOGLE_APP_ID,
    googleAppSecret: process.env.GOOGLE_APP_SECRET,
  },
};
