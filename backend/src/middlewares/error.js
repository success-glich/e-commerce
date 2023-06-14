const ErrorHandler = require("../utils/errorHandler");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = `Resource not found! Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Mongoose Duplicate key error
  console.log(err.code);
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again `;
    err = new ErrorHandler(message, 400);
  }
  //JWT EXPIRE Error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message || err.stack,
  });
};
module.exports = errorHandler;
