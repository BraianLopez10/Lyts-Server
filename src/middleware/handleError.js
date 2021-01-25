const boom = require("@hapi/boom");
function wrapWithBoom(error, req, res, next) {
  if (boom.isBoom(error)) {
    next(error);
  } else {
    next(boom.badImplementation(error));
  }
}
function handleError(error, req, res, next) {
  const {
    output: { payload, statusCode },
  } = error;
  console.log(payload);
  res.status(statusCode).json(withStackError(payload, error));
}

function withStackError(payload, error) {
  if (process.env.NODE_ENV === "development") {
    payload.stack = error.stack;
    return payload;
  } else {
    return payload;
  }
}

module.exports = { handleError, wrapWithBoom };
