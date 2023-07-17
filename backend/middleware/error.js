const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //handling mongodb errors
  if(err.name=="CastError"){
    const message= `Resource not found, Invalid : ${err.path}`;
    err= new ErrorHandler(message,400);
  }

  //mongoose 11000 error for duplicate key error
  if(err.code=== 11000){
    const message= `Duplicate ${Object.keys(err.keyValue)} entered!`;

    err=new ErrorHandler(message,400);
  }

  //josnwebtoken error
  if(err.name=== "JsonWebTokenError"){
    const message= `JSON web token invalid! Try again`;

    err=new ErrorHandler(message,400);
  }


  //jwt expire error
  if(err.name=== "TokenExpiredError"){
    const message= `JSON web token expired! Try again`;

    err=new ErrorHandler(message,400);
  }


  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};