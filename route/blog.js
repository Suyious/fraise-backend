import {Router} from "express";
import {createNewBlog, deleteBlog, getAllBlogs, getBlog, updateBlog} from "../controller/blog.js";
import {isAuthenticatedUser} from "../middleware/auth.js";

const router = Router();

router.route("/blogs").get(getAllBlogs);
router.route("/blogs/create").post(isAuthenticatedUser, createNewBlog);
router.route("/blogs/:id")
  .get(getBlog)
  .put(isAuthenticatedUser, updateBlog)
  .delete(isAuthenticatedUser, deleteBlog)

export default router;
