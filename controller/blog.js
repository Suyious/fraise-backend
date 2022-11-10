import Blog from "../model/blog.js"
import catchAsyncErrors from "../middleware/asyncErrors.js"
import ErrorHandler from "../utils/error.js";

export const getAllBlogs = catchAsyncErrors(async (_req, res, _next) => {

  const blogs = await Blog.find();

  const blogsCount = await Blog.countDocuments();
  const resultCount = blogs.length;

  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
    resultCount
  })
})

export const createNewBlog = catchAsyncErrors(async (req, res, _next) => {

  req.body.author = req.user.id;

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    blog
  })

})

export const getBlog = catchAsyncErrors(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id);

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
