import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/Video.model.js";
import { Playlist } from "../models/playlist.model.js";

const router = Router();

router.use(verifyJwt);

router.route("/getuser").get(
  asyncHandler(async (req, res) => {
    const users = await User.find().select(
      "username email fullName avatar coverImage"
    );

    res.status(200).json(new ApiResponse(200, users, "All User Fetchd"));
  })
);
router.route("/getvideo").get(
  asyncHandler(async (req, res) => {
    const users = await Video.find();

    res.status(200).json(new ApiResponse(200, users, "All Video  Fetchd"));
  })
);
router.route("/getplaylist").get(
  asyncHandler(async (req, res) => {
    const playlist = await Playlist.find();
    res.status(200).json(new ApiResponse(200, playlist, "All playlist found"));
  })
);

export default router;
