import express from "express";
export function handleError(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  return res.status(500).json({
    error: withStackError(error),
    statusCode: 500,
    message: "Internal Server Error",
  });
}

function withStackError(error: Error) {
  if (process.env.NODE_ENV === "development") {
    return error.stack;
  } else {
    return error;
  }
}
