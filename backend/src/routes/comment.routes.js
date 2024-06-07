import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  addComments,
  deleteComment,
  getVideoComments,
} from "../controllers/comment.controller.js";
const router = Router();

router.use(verifyJwt);

router.route("/:videoId").get(getVideoComments).post(addComments);
router.route("/c/:commentId").delete(deleteComment);

export default router;
