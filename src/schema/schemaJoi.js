const Joi = require("joi");
const mongoose = require("mongoose");

const SchemaCreateUser = Joi.object({
  username: Joi.string().max(40).min(5).required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
});
const SchemaLoginUser = Joi.object({
  username: Joi.string().max(40).min(5).required(),
  password: Joi.string().min(8).max(30).required(),
});
const SchemaBodyUpdateUser = Joi.object({
  name: Joi.string(),
  bio: Joi.string(),
});
const SchemaCreatePost = Joi.object({
  titlePost: Joi.string(),
});
const SchemeIdParam = Joi.object({
  id: Joi.string().length(24).required(),
});

module.exports = {
  SchemaCreateUser,
  SchemaLoginUser,
  SchemaBodyUpdateUser,
  SchemaCreatePost,
  SchemeIdParam,
};
