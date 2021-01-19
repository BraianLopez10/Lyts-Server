import moment from "moment";
import express from "express";
import AuthService from "../../../services/auth/auth-service";
import response from "../../../utils/response";

class AuthController {
  constructor(private authService: AuthService) {}

  async signUp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const param = req.body;
    throw next(Error(""));
    try {
      const existUser = await this.authService.userExist(param.username);
      if (existUser) {
        response.responseError(res, "El usuario ya esta registrado", 400);
      }
      const newUser = {
        name: param.name,
        email: param.email,
        username: param.username,
        password: param.password,
      };
      const user = await this.authService.userCreate(newUser);
      response.responseSuccess(res, "registrado correctamente", user, 201);
    } catch (err) {
      throw new Error();
    }
  }

  // signIn(req : express.Request, res :express.Response) {
  //   passport.authenticate("local", { session: false }, (err, data, info) => {
  //     console.log("Logueando");
  //     if (err || !data) {
  //       console.log(err, data);
  //       return res.status(401).json(info);
  //     }
  //     const payload = {
  //       sub: data._id,
  //       exp: moment().add("5", "hour").unix(),
  //     };
  //     let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
  //     //Temporal;
  //     // data.notifications = [];
  //     return res.status(200).json({
  //       token,
  //       user: data,
  //     });
  //   })(req, res);
  // }

  //  signUpFacebook(req : express.Request, res :express.Response) {
  //   passport.authenticate('facebook-token' , { session:false } , function (err , data , info) {

  //     if (data) {
  //       const payload = {
  //         sub: data._id,
  //         exp: moment().add("5", "hour").unix(),
  //       };
  //       let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
  //       res.set('x-auth-token' , token)
  //       return res.status(200).json({
  //         data
  //       })
  //     }else{
  //       return res.status(401).send()
  //     }
  //   })(req,res)
  // }
}

export default AuthController;
