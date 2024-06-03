import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccesToken,
  registerUser,
  getUserChannelProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshtoken").post(refreshAccesToken);



//testing ....
// router.route("/getchannel").post(getUserChannelProfile);
export default router;
 
