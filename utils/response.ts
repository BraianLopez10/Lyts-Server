import express from "express";

function responseSuccess(
  res: express.Response,
  message: string = "",
  data = {},
  statusCode: number = 200
) {
  res.status(statusCode).json({
    error: false,
    statusCode,
    message,
    body: data,
  });
}

function responseError(
  res: express.Response,
  message: string = "",
  statusCode: number = 500
) {
  res.status(statusCode).json({
    error: true,
    statusCode,
    body: message,
  });
}

export default { responseError, responseSuccess };
