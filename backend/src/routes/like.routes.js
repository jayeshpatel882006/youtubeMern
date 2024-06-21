import { Router } from "express";
import {
  getLikedVideos,
  likeCountofVideo,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/toggal/v/:videoId").post(toggleVideoLike);
router.route("/toggal/c/:commentId").post(toggleCommentLike);
router.route("/toggal/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);
router.route("/video/getlikes/:videoId").get(likeCountofVideo);

export default router;
