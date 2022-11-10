import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";
import catchAsyncErrors from "./asyncErrors.js";
import User from "../model/user.js"

export const isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
  const {token} = req.cookies;

  if(!token){
    req.user = null;
    // next(new ErrorHandler("login to access resource", 401));
    next();
  } else {
    const DecodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(DecodedData.id);
    next();
  }
})
