const { string } = require("joi");
const Joi = require("joi");

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
  titlePost: Joi.string().required(),
});

module.exports = {
  SchemaCreateUser,
  SchemaLoginUser,
  SchemaBodyUpdateUser,
  SchemaCreatePost,
};
