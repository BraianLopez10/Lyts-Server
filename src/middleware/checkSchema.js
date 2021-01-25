const boom = require("@hapi/boom");
function checkSchema(joiSchema, check) {
  return function (req, res, next) {
    const validate = joiSchema.validate(req[check]);
    if (validate.error) {
      next(boom.badRequest(validate.error));
    } else {
      next();
    }
  };
}

module.exports = checkSchema;
