import mongoose from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  if (!videoId) {
    throw new Apierror(400, "VideoId is required");
  }
  let userId = req.user._id;

  const likedVideo = await Like.create({
    video: videoId,
    likedBy: userId,
  });

  //   console.log(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, likedVideo, "video liked done"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!commentId) {
    throw new Apierror(400, "comment id is required");
  }
  let userId = req.user._id;

  const likedComment = await Like.create({
    comment: commentId,
    likedBy: userId,
  });

  //   console.log(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, likedComment, "comment liked done"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!tweetId) {
    throw new Apierror(400, "tweetId is required");
  }
  let userId = req.user._id;

  const likedTweet = await Like.create({
    tweet: tweetId,
    likedBy: userId,
  });

  //   console.log(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, likedTweet, "tweet liked done"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user._id;

  //   const likedVideo = await Like.find({likedBy: userId});
  const likedVideo = await Like.aggregate([
    {
      $match: {
        likedBy: userId,
      },
    },
    {
      $lookup: {
        from: "videos",
        foreignField: "_id",
        localField: "video",
        as: "video",
        pipeline: [
          {
            $match: {
              isPublished: true,
            },
          },
          {
            $project: {
              thubnail: 1,
              title: 1,
              description: 1,
              duration: 1,
              views: 1,
              isPublished: 1,
              owner: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$video",
    },
    {
      $project: {
        _id: 0,
        video: 1,
        updatedAt: 1,
        createdAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, likedVideo, "Fetchd liked video"));
});

export { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike };
