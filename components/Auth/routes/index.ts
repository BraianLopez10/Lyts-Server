import express from  "express";
import AuthController from  "../index";
const routes  = express()

routes.post("/signup", (req,res,next) =>  AuthController.signUp(req,res,next));
// routes.post("/signin", AuthController.signIn);
// routes.post("/facebook", AuthController.signUpFacebook);

export default routes;
