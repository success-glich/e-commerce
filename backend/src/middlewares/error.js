const ErrorHandler = require("../utils/errorHandler");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  console.log(err.name);
  if (err.name === "CastError") {
    const message = `Resource not found! Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    msg: err.message || err.stack,
  });
};
module.exports = errorHandler;
