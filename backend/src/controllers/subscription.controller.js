import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  //   console.log(channelId);
  let userId = req.user._id.toString();
  //   console.log(channelId, userId);
  if (!channelId) {
    throw new Apierror(400, "Channel Id Is required");
  }
  //   if (channelId == userId) {
  //     throw new Apierror(400, "User can not Subscribe it's own channel");
  //   }

  let isChhnalSubscribed = await Subscription.findOne({
    channel: channelId,
    subscriber: userId,
  });

  if (isChhnalSubscribed == null) {
    let subscribed = await Subscription.create({
      channel: channelId,
      subscriber: userId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, subscribed, "Subscribed successfully"));
  } else {
    let unsubscribe = await Subscription.findByIdAndDelete(
      isChhnalSubscribed._id
    );
    // console.log(isChhnalSubscribed);
    return res
      .status(200)
      .json(new ApiResponse(200, unsubscribe, "unsubscribe successfully"));
  }

  return res.json({ helo: "ehel" });
  //   await Subscription.create({

  //   })
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!channelId) {
    throw new Apierror(404, "we need Channel id to find its subscriber ");
  }

  // const channel = await Subscription.find({
  //   channel: new mongoose.Types.ObjectId(channelId),
  // }).select("subscriber");
  const channel = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "subscriber",
        as: "subscriber",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $group: {
        _id: null,
        subscribers: { $push: "$subscriber" },
      },
    },
    {
      $project: {
        subscribers: 1,
        _id: 0,
      },
    },
  ]);
  if (!channel) {
    throw new Apierror(404, "we need Channel id to find its subscriber ");
  }
  //   console.log(channel.length);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channel,
        ` All SubScriber found, number of subscriber : ${channel.length}.`
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  //subscriber : 665ebbb74801e00a693d9081
  /*
  now user is subscriber and we have to find subscriber
  //  */
  // const { subscriberId } = req.params;
  const user = req.user._id.toString();

  // const channels = await Subscription.find({ subscriber: user });
  const channels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(user),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "channel",
        as: "channel",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$channel",
    },
    {
      $group: {
        _id: null,
        channels: { $push: "$channel" }, // Collect all channels into an array
      },
    },
    {
      $project: {
        channels: 1,
        _id: 0,
      },
    },
  ]);

  // console.log(user);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channels,
        `All subscribed channel found of user ${req.user.username}`
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
