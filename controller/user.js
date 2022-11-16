import User from "../model/user.js"
import sendToken from "../utils/jwt.js"
import catchAsyncErrors from "../middleware/asyncErrors.js"
import ErrorHandler from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = catchAsyncErrors(async (req, res, _next ) => {
  const { name, username, email, password, avatar } = req.body;

  const user = await User.create({
    name, username, email, password, avatar
  })

  sendToken(user, 201, res);
})

export const signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Validation Failed: email: email is required, password: password is required", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if(!user){
    return next(new ErrorHandler("Authentication Failed: user: Invalid `email` or `password`", 401));
  }

  const passwordmatch = await user.comparepassword(password);

  if(!passwordmatch){
    return next(new ErrorHandler("Authentication Failed: user: Invalid `email` or `password`", 401));
  }

  sendToken(user, 200, res);
 
})

export const getThisUser = catchAsyncErrors(async (req, res, next) => {

  if(req.user === null) {
    res.status(200).json({
      success: true,
      user: req.user
    })
    return next()
  }

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })

})

export const getUser = catchAsyncErrors(async (req, res, _next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    user
  })
})

export const updateUser = catchAsyncErrors(async (req, res, _next) => {

  if(req.body.avatar){
    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "/fraise/avatars",
      transformation: {
        quality: 10
      }
    }).catch(err => {
      console.log(err);
    })

    req.body.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    body: user
  })

})

export const logout = catchAsyncErrors(async (_req, res, _next) => {
  let options;
  if(process.env.NODE_ENV !== 'production'){
    options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    }
  } else {
    options = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: true
    }
  }

  res.cookie("token", null, options)

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

  let options;
  if(process.env.NODE_ENV !== 'production'){
    options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    }
  } else {
    options = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: true
    }
  }

  res.cookie("token", null, options)

  await user.remove();

  res.status(200).json({
    success: true,
    message: "account deleted succesfully"
  });
})
