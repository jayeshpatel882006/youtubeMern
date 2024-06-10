import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/User.model.js";
// import { Video } from "../models/Video.model.js";

const checkOwner = (currentUser, userId) => {
  //   console.log(currentUser.toString(), userId.toString());
  if (currentUser.toString() == userId.toString()) {
    return true;
  } else {
    return false;
  }
};

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //TODO: create playlist

  if (!name) {
    throw new Apierror(400, "Name And Description is required");
  }

  const cretedplaylist = await Playlist.create({
    name,
    description: description.length == 0 ? "" : description,
    owner: req.user._id,
  });
  if (cretedplaylist == null) {
    throw new Apierror(500, "server error while cretaing playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cretedplaylist, "Playlist Creted Successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
  if (!userId) {
    throw new Apierror(400, "User Id is not Found");
  }

  //   const playlist = await Playlist.find({ owner: userId });
  const playlist = await Playlist.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
        owner: 1,
        name: 1,
        description: 1,
        numberOfVideo: {
          $cond: {
            if: { $isArray: "$videos" },
            then: { $size: "$videos" },
            else: "NA",
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist Fetchd"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  if (!playlistId) {
    throw new Apierror(400, "The Playlist id is missing for fething it");
  }
  //   const playlist = await Playlist.findById(playlistId);
  const playlist = await Playlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        foreignField: "_id",
        localField: "videos",
        as: "videos",
        pipeline: [
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
                    email: 1,
                    fullName: 1,
                    avatar: 1,
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
              videoFile: 1,
              thubnail: 1,
              title: 1,
              owner: 1,
            },
          },
        ],
      },
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
              email: 1,
              avatar: 1,
              createdAt: 1,
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
        name: 1,
        description: 1,
        videos: 1,
        owner: 1,
      },
    },
  ]);

  if (playlist == null || !playlist) {
    throw new Apierror(500, "playlist can't be found");
  }

  //   let checkUser = checkOwner(req.user._id, playlist[0].owner);

  //   if (checkUser == false) {
  //     throw new Apierror(400, "This is restricted playlist");
  //   }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist Fetchd Successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if (!playlistId && !videoId) {
    throw new Apierror(
      400,
      "Playlist Id and Video Id Is required to add video"
    );
  }

  //   const addvideo = await Playlist.findByIdAndUpdate(
  //     playlistId,

  //     { $push: { videos: videoId } },
  //     { new: true }
  //   );
  const addvideo = await Playlist.findById(playlistId);

  if (!addvideo || addvideo == null) {
    throw new Apierror(
      400,
      "something went wrong while fetching the credential off video and playlist"
    );
  }
  let checkowner = checkOwner(req.user._id, addvideo.owner);

  if (checkowner == false) {
    throw new Apierror(
      400,
      "unuthorized request can't add video to playlist beacuse this is others playlist"
    );
  }

  //   let isaddedornot = addvideo.videos.map((ite, index) => {
  //     if (ite == videoId) {
  //       return true;
  //     }
  //   });

  let isaddedornot = addvideo.videos.includes(videoId);

  //   console.log(isaddedornot);
  if (isaddedornot === true) {
    throw new Apierror(400, "video is already added to the playlist");
  }

  addvideo.videos.push(videoId);
  let ressult = await addvideo.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, ressult, "added the video to Playlist Successfully")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (!playlistId && !videoId) {
    throw new Apierror(
      400,
      "Playlist Id and Video Id Is required to remove video"
    );
  }

  const removevideo = await Playlist.findById(playlistId);
  //   console.log(removevideo);
  if (!removevideo || removevideo == null) {
    throw new Apierror(
      400,
      "stope the deleting process because something went wrong while fetching the credential off video and playlist "
    );
  }
  let checkowner = checkOwner(req.user._id, removevideo.owner);

  if (checkowner == false) {
    throw new Apierror(
      400,
      "unuthorized request can't remove video from  playlist beacuse this is others playlist"
    );
  }

  const updatetedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: new mongoose.Types.ObjectId(videoId) } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatetedPlaylist, "Video deleted Successfully")
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!playlistId) {
    throw new Apierror(400, "Playlist Id is reqiuired");
  }
  const playlist = await Playlist.findById(playlistId);

  let checkowner = checkOwner(req.user._id, playlist.owner);
  if (!checkowner) {
    throw new Apierror(
      403,
      "Unauthorized request. You cannot delete another user's playlist."
    );
  }

  let deleted = await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new ApiResponse(200, deleted, "Playlist deleted Successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!playlistId) {
    throw new Apierror(400, "playList Id is required");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist || playlist == null) {
    throw new Apierror(403, "play list not found for updating.");
  }
  let checkowner = checkOwner(req.user._id, playlist.owner);
  if (!checkowner) {
    throw new Apierror(
      403,
      "Unauthorized request. You cannot delete another user's playlist."
    );
  }

  playlist.name = name;
  playlist.description = description;
  let result = await playlist.save({ validateBeforeSave: false });
  res.json(result);
});

export {
  addVideoToPlaylist,
  updatePlaylist,
  deletePlaylist,
  removeVideoFromPlaylist,
  getPlaylistById,
  getUserPlaylists,
  createPlaylist,
};
