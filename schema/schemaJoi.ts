import Joi from 'joi'

const SchemaCreateUser = Joi.object({
  username : Joi.string().max(40).min(5).required(),
  email : Joi.string().required(),
  name : Joi.string().required(),
  password: Joi.string().min(8).max(30).required()
})

export default  {
  SchemaCreateUser
}