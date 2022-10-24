import ErrorHandler from "../utils/error.js";

export default (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb id
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong jwt-token
  if(err.name === "JsonWebTokenError"){
    const message = `jwt-token is invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }

  // jwt-token expired
  if(err.name === "JsonWebTokenError"){
    const message = `jwt-token is expired. Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })

}
