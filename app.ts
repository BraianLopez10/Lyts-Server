import "./db";
import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import passport from "passport";
// import "./libs/passport";
import bodyParser from "body-parser";

// import routes from "./routes";
import authRoute from "./components/Auth/routes";
import { handleError } from "./middleware/handleError";
// import middlewares from "./middleware";

const app = express();

//Config
// app.use(passport.initialize());
// if (process.env.NODE_ENV === "development"){
//   app.use(morgan("dev"));
// }
// app.use(cors());
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
  res.send("hola");
});
app.use("/auth/", authRoute);
app.use(handleError);
// app.use("/api/v1/", middlewares.checkLogin, routes);

export default app;
