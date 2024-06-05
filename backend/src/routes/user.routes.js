import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccesToken,
  registerUser,
  getUserChannelProfile,
  getCurrentUser,
  updateUserAvatar,
  updateUserDetails,
  chnageCurrentPassword,
  updateUserCoverImage,
  getWatchHistory,
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
router.route("/getcurrentuser").get(verifyJwt, getCurrentUser);
router.route("/changePassword").post(verifyJwt, chnageCurrentPassword);
router.route("/updateuserdetails").patch(verifyJwt, updateUserDetails);
router
  .route("/updateuseravatar")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router
  .route("/updatecoverimage")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);

router.route("/refreshtoken").post(refreshAccesToken);
router.route("/channel/:username").get(verifyJwt, getUserChannelProfile);
router.route("/history").get(verifyJwt, getWatchHistory);
router.route("/checkTest").post(async (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({ data });
});



//testing ....
// router.route("/getchannel").post(getUserChannelProfile);
export default router;
 
