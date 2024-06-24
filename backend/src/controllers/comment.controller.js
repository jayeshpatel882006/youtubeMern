import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = "1", limit = "5" } = req.query;

  let PAGE = parseInt(page);
  let LIMIT = parseInt(limit);
  if (!videoId) {
    throw new Apierror(400, "VideoId required to get video's comments");
  }
  const offset = (PAGE - 1) * LIMIT;

  // let commnts = await Comment.find({ video: videoId })
  //   .skip(offset)
  //   .limit(LIMIT);
  // // .select("content");

  let commnts = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: LIMIT,
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
  ]);

  if (!commnts || commnts == null || commnts.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, commnts, "Comments not found in this video"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, commnts, "Comments Fetchd SuccessFully"));
});

const addComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;
  let user = req.user._id.toString();
  if (!videoId) {
    throw new Apierror(400, "Video Id is needed");
  }
  if (!content || content.length == 0) {
    throw new Apierror(200, "comment can't be empty");
  }

  // const comment = await Comment.findById(videoId);
  const comment = await Comment.create({
    owner: user,
    video: videoId,
    content,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added Successfully"));
});
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new Apierror(200, "comment can't be empty");
  }
  let user = req.user._id.toString();
  let isMadeByUser = await Comment.findById(commentId);
  if (!isMadeByUser) {
    throw new Apierror(
      400,
      "Comment is not found with this id or Comments is deleted"
    );
  }

  if (isMadeByUser.owner.toString() !== user) {
    throw new Apierror(
      200,
      "this is not your comment ,you can only delete your comment"
    );
  }

  let deleetComment = await Comment.deleteOne({ _id: commentId });

  return res
    .status(200)
    .json(new ApiResponse(200, deleetComment, "Comment deleted Successfully"));
});

export { getVideoComments, addComments, deleteComment };
