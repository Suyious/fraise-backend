import User from "../model/user.js"
import sendToken from "../utils/jwt.js"
import catchAsyncErrors from "../middleware/asyncErrors.js"
import ErrorHandler from "../utils/error.js";

export const signup = catchAsyncErrors(async (req, res, _next ) => {
  const { name, username, email, password } = req.body;

  const user = await User.create({
    name, username, email, password
  })

  sendToken(user, 201, res);
})

export const signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Please enter fields `email` and `password`", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if(!user){
    return next(new ErrorHandler("invalid `email` or `password`", 401));
  }

  const passwordmatch = await user.comparepassword(password);

  if(!passwordmatch){
    return next(new ErrorHandler("invalid `email` or `password`", 401));
  }

  sendToken(user, 200, res);
 
})

export const getuserdetail = catchAsyncErrors(async (req, res, _next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

export const logout = catchAsyncErrors(async (_req, res, _next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    // sameSite: "None",
    // secure: true
  })

  res.status(200).json({
    success: true,
    message: "logged out succesfully"
  })
})

export const deletesignedaccount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if(!user){
    return next(new ErrorHandler("user does not exist"), 400);
  }

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    // sameSite: "None",
    // secure: true
  })

  await user.remove();

  res.status(200).json({
    success: true,
    message: "account deleted succesfully"
  });
})
