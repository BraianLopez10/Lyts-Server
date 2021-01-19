"use strict";
const UserModel = require("../../models/user");
const moment = require("moment");
const passport = require("passport");
const jwt = require("jsonwebtoken");
import express from 'express'

import AuthService from '../../services/auth'

interface User {
  name : string,
  email: string,
  userName: string,
  password: string,
}

class AuthController { 

  private user : User = {}

  async  signUp(req : express.Request, res :express.Response) {
    this.user = req.body
    try {
      const existUser = await UserModel.countDocuments({
        userName: param.userName,
      });
      if (existUser) {
        return res.status(422).json({ messague: "El usuario ya existe" });
      }
      const newUser = new UserModel({
        name: param.name,
        email: param.email,
        userName: param.userName,
        password: param.password,
      });
      await newUser.save({ password: 0 });

      return res.status(201).json({ messague: "Te has registrado con éxito" });
    } catch (err) {  
      return res.status(404).send();
    }
  }
  
  signIn(req : express.Request, res :express.Response) {
    passport.authenticate("local", { session: false }, (err, data, info) => {
      console.log("Logueando");
      if (err || !data) {
        console.log(err, data);
        return res.status(401).json(info);
      }
      const payload = {
        sub: data._id,
        exp: moment().add("5", "hour").unix(),
      };
      let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
      //Temporal;
      // data.notifications = [];
      return res.status(200).json({
        token,
        user: data,
      });
    })(req, res);
  }
  
   signUpFacebook(req : express.Request, res :express.Response) {
    passport.authenticate('facebook-token' , { session:false } , function (err , data , info) {
  
      if (data) {
        const payload = {
          sub: data._id,
          exp: moment().add("5", "hour").unix(),
        };
        let token = jwt.sign(JSON.stringify(payload), process.env.TOKEN_SECRET);
        res.set('x-auth-token' , token)
        return res.status(200).json({
          data
        })
      }else{
        return res.status(401).send()
      }
    })(req,res)
  }
}


