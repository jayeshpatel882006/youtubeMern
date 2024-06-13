import mongoose from "mongoose";
import { Apierror } from "../utils/ApiError.js";
import { Video } from "../models/Video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteFromClodinery,
  uploadToCloudinary,
} from "../utils/cloudinery.js";

const check = asyncHandler(async (req, res) => {
  const data = req.body;

  // console.log(data);

  return res.json({
    data,
  });
});

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
const pageNum = parseInt(page, 10);
const limitNum = parseInt(limit, 10);

let filter = {};
if (query) {
  filter.title = { $regex: query, $options: "i" };
}
if (userId) {
  // If userId is provided, add a filter to match the owner field to the provided userId
  filter.owner = new mongoose.Types.ObjectId(userId);
}

let sort = {};
if (sortBy && (sortType === "desc" || sortType === "asc")) {
  sort[sortBy] = sortType === "desc" ? -1 : 1;
}

// let videos = await Video.find(filter)
//   .sort(sort)
//   .skip((pageNum - 1) * limitNum)
//   .limit(limitNum);

let videos = await Video.aggregate([
  { $match: filter },
  // { $sort: sort },
  { $skip: (pageNum - 1) * limitNum },
  { $limit: limit },
  {
    $lookup: {
      from: "users", // The collection to join with
      localField: "owner", // Field from the Video collection
      foreignField: "_id", // Field from the User collection
      as: "owner",
      pipeline: [
        {
          $project: {
            avatar: 1,
            email: 1,
            username: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: "$owner",
  },
  {
    $project: {
      _id: 1,
      videoFile: 1,
      thubnail: 1,
      title: 1,
      description: 1,
      duration: 1,
      views: 1,
      isPublished: 1,
      createdAt: 1,
      updatedAt: 1,
      owner: 1,
    },
  },
]);
// console.log({ filter, sort, videos });

return res.status(200).json(new ApiResponse(200, videos, "Video Fetchd"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // console.log(title, description);
  // TODO: get video, upload to cloudinary, create video
  //   console.log(title, description);
  if (!title && !description) {
    throw new Apierror(
      400,
      "Title And Description required for uploading video"
    );
  }

  const existedVideo = await Video.findOne({
    $or: [{ title }, { description }],
  });

  if (existedVideo) {
    if (existedVideo?.title == title) {
      throw new Apierror(
        400,
        "A videp is used this title and Descrption so you can't use this title "
      );
    }
    if (existedVideo.description == description) {
      throw new Apierror(
        400,
        "A videp is used this descrption so you can't use this  descrption"
      );
    }
  }

  const videofile = req.files?.videoFile[0].path;
  const thumbnailfile = req.files?.thumbnail[0].path;

  if (!videofile) {
    throw new Apierror(400, "video File Is Required");
  }

  if (!thumbnailfile) {
    throw new Apierror(400, "thumbnail File Is Required");
  }

  const videoCloud = await uploadToCloudinary(videofile);
  const thumbnailCloud = await uploadToCloudinary(thumbnailfile);

  if (!videoCloud.url) {
    throw new Apierror(500, "video File Is not upload to clodinery");
  }
  if (!thumbnailCloud.url) {
    throw new Apierror(500, "thumbnail File Is not upload to clodinery");
  }

  const video = await Video.create({
    videoFile: videoCloud.url,
    thubnail: thumbnailCloud.url,
    title,
    description,
    duration: videoCloud.duration,
    owner: req.user._id,
  });
  const user = req.user;
  return res
    .status(200)
    .json(
      new ApiResponse(200, { video, user }, `Video uploaded Successfully}`)
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  if (!videoId) {
    throw new Apierror(200, "VideoId Is required");
  }

  // const video = await Video.findById(videoId);
  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ChhannalDetail",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              subscriberCount: {
                $size: "$subscribers",
              },
            },
          },
          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
              subscriberCount: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        ChhannalDetail: 1,
        createdAt: 1,
        views: 1,
        duration: 1,
        videoFile: 1,
        thubnail: 1,
        title: 1,
        description: 1,
        isPublished: 1,
      },
    },
  ]);

  if (video == null) {
    throw new Apierror(
      500,
      "Video with this video id  was not found from database"
    );
  }
  if (video[0].isPublished === true) {
    return res.status(200).json(new ApiResponse(200, video, "Video Fetchd"));
  } else {
    // console.log(video);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video is not publishde yet"));
  }
});

// const updateVideo = asyncHandler(async (req, res) => {
//   const { videoId } = req.params;
//   //TODO: update video details like title, description, thumbnail
// });

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  if (!videoId) {
    throw new Apierror(
      404,
      "we need VideoId to delete the video , video id is not Found"
    );
  }

  const deleted = await Video.findByIdAndDelete(videoId);
  // const deleted = await Video.findById(videoId);
  if (!deleted) {
    throw new Apierror(500, " video is not exist or deleted  ");
  }
  // console.log(deleted);
  let videopublicId = deleted?.videoFile.split("/").pop().split(".")[0];
  let thumbnailpublicId = deleted?.thubnail.split("/").pop().split(".")[0];

  await deleteFromClodinery(videopublicId, "video");
  await deleteFromClodinery(thumbnailpublicId, "image");

  return res
    .status(200)
    .json(new ApiResponse(200, deleted, "Video deleted Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new Apierror(404, "VideoId required");
  }
  // console.log(videoId);
  const video = await Video.findById(videoId);

  if (video == null) {
    throw new Apierror(
      500,
      "Video with this video id  was not found from database"
    );
  }

  let isPublishd = !video.isPublished;
  // console.log(isPublishd);

  video.isPublished = isPublishd;
  await video.save({ validateBeforeSave: false });

  if (isPublishd == true) {
    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video is Publishd"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video is unpublish"));
  }
});

export {
  deleteVideo,
  getAllVideos,
  getVideoById,
  togglePublishStatus,
  // updateVideo,
  publishAVideo,
  check,
};
