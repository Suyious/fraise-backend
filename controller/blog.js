import Blog from "../model/blog.js"
import catchAsyncErrors from "../middleware/asyncErrors.js"
import ErrorHandler from "../utils/error.js";
import {search} from "../utils/features.js";
import { v2 as cloudinary } from "cloudinary"

export const getAllBlogs = catchAsyncErrors(async (req, res, _next) => {

  let blogs = Blog.find().populate("author", "name email avatar.url");

  const { keyword, draft, ...rest } = req.query;

  if(keyword) {
    blogs = search(blogs, keyword);
  }
  if(draft) {
    blogs = blogs.find({ draft })
  }
  blogs = blogs.find(rest);

  blogs = await blogs.exec();

  const blogsCount = await Blog.countDocuments();
  const resultCount = blogs.length;

  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
    resultCount
  })
})

export const createNewBlog = catchAsyncErrors(async (req, res, next) => {

  if(req.user === null){
    return next(new ErrorHandler("You need to be authenticated to access this resource.", 401))
  }

  req.body.author = req.user.id;

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    blog
  })
})

export const uploadBlogImage = catchAsyncErrors(async (req, res, _next) => {

  if(req.body.image) {

    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: "/fraise/content",
      transformation: {
        quality: 60
      }
    }).catch(err => {
      console.log(err);
    })

    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  res.status(200).json({
    success: true,
    body: req.body
  })
})

export const getBlog = catchAsyncErrors(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id).populate("author", "name email avatar.url")

  if(!blog){
    return next(new ErrorHandler("nothing found", 404));
  }

  res.status(200).json({
    success: true,
    blog
  })

})

export const updateBlog = catchAsyncErrors(async (req, res, next) => {

  let blog = await Blog.findById(req.params.id);

  if(!blog){
    return next(new ErrorHandler("nothing found", 404));
  }

  blog = await Blog.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    blog
  })

})

export const deleteBlog = catchAsyncErrors(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id);

  if(!blog){
    return next(new ErrorHandler("nothing found", 404));
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "delete successful"
  })

})
