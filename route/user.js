import { Router } from "express";
import multer from "multer";
import { deletesignedaccount, getThisUser, getUser, logout, signin, signup, updateUser } from "../controller/user.js"
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me")
  .get(isAuthenticatedUser, getThisUser)
  .put(isAuthenticatedUser, multer({ limits: { fieldSize: 25 * 1024 * 1024 } }).single('avatar'), updateUser);
router.route("/user/:id").get(getUser)
router.route("/logout").post(logout);
router.route("/delete_signed_account").delete(isAuthenticatedUser, deletesignedaccount)

export default router;
