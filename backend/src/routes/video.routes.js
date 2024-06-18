import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  togglePublishStatus,
  // updateVideo,
  publishAVideo,
  check,
  addView,
  getCountofVideoofUser,
  updateThumbnail,
} from "../controllers/video.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/").get(getAllVideos);
router.route("/upload").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router.route("/deleteVideo/:videoId").delete(deleteVideo);
router
  .route("/updateThumbnail/:videoId")
  .patch(upload.single("thubnail"), updateThumbnail);
router.route("/getVideo/:videoId").get(getVideoById).post(addView);
router.route("/toggalPublish/:videoId").post(togglePublishStatus);
router.route("/getvideocount/:userId").get(getCountofVideoofUser);

export default router;
