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
} from "../controllers/video.controller.js";

const router = Router();

router.use(verifyJwt);

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
router.route("/getVideo/:videoId").get(getVideoById);
router.route("/toggalPublish/:videoId").post(togglePublishStatus);

export default router;