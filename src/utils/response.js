function responseSuccess(res, message = "", data = {}, statusCode = 200) {
  res.status(statusCode).json({
    statusCode,
    error: false,
    message,
    body: data,
  });
}

module.exports = responseSuccess;
