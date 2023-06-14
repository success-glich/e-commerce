const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/vars");
const User = require("../user/user");
const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("token is not found please login first", 400));
  }
  const decodeData = jwt.verify(token, JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  next();
});
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Roles: ${req.user.role} 
      is not allowed to access this resource
      
      `)
      );
    }
    next();
  };
};
module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
};
