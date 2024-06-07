import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";

const router = Router();

router.use(verifyJwt);

router
  .route("/c/:channelId")
  .post(toggleSubscription)
  .get(getUserChannelSubscribers);

router.route("/u/subscribedchannel").get(getSubscribedChannels);

export default router;
