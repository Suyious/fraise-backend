import { Router } from "express";
import { deletesignedaccount, getuserdetail, logout, signin, signup } from "../controller/user.js"
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").get(isAuthenticatedUser, getuserdetail);
router.route("/logout").post(logout);
router.route("/delete_signed_account").delete(isAuthenticatedUser, deletesignedaccount)

export default router;
