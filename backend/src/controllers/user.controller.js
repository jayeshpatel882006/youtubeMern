import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { uploadToCloudinary } from "../utils/cloudinery.js";
import jtw from "jsonwebtoken";
import mongoose from "mongoose";

const generetAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const generatedaccessToken = user.generateAccessToken();
    const generatedrefreshToken = user.generateRefreshToken();

    user.refreshToken = generatedrefreshToken;
    // console.log(user);
    await user.save({ validateBeforeSave: false });

    return { generatedrefreshToken, generatedaccessToken };
  } catch (error) {
    throw new Apierror(
      500,
      "Something went wrong while Genereating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //     message: "ok",
  //   });
  const { email, password, fullName, username } = req.body;
  console.log(email, password, fullName, username);
  if (
    [email, password, fullName, username].some((field) => field.trim() === "")
  ) {
    throw new Apierror(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new Apierror(409, "User is alredy existed");
  }

  const avatarLocalPath = req.files?.avatar[0].path;
  //   const CoverPath = req.files?.coverImage[0]?.path;
  let CoverPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    CoverPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new Apierror(400, "Avatar File Is Required");
  }
  console.log("avatarLocalPath :", avatarLocalPath);

  const avatar = await uploadToCloudinary(avatarLocalPath);
  const Cover = await uploadToCloudinary(CoverPath);

  if (!avatar) {
    throw new Apierror(400, "Avatar File Is Required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: Cover?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const cretedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!cretedUser) {
    throw new Apierror(500, "Something went wrong while Registering User");
  }

  res
    .status(201)
    .json(new ApiResponse(200, cretedUser, "User Registerd Successfuly"));

  // res.send("Done");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    throw new Apierror(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new Apierror(404, "User Dose Not Exist");
  }

  const isPassCorrect = await user.isPassWordCorrect(password);

  if (!isPassCorrect) {
    throw new Apierror(401, "Invalid credentials of logged time");
  }
  const { generatedrefreshToken, generatedaccessToken } =
    await generetAccessAndRefreshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", generatedaccessToken, options)
    .cookie("refreshToken", generatedrefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
        },
        "User Logedin Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //this remove this field from document
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "UserLogged Out "));
});

const refreshAccesToken = asyncHandler(async (req, res) => {
  const incomingRefreshToke = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToke) {
    throw new Apierror(401, "unuthorized requiest");
  }

  try {
    const decodeToken = await jtw.verify(
      incomingRefreshToke,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id);
    if (!user) {
      throw new Apierror(401, "Invalid refresh token");
    }
    console.log(user);
    console.log(
      "usertoken :",
      user.refreshToken,
      " /n incoming :",
      incomingRefreshToke
    );

    if (user.refreshToken !== incomingRefreshToke) {
      throw new Apierror(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { generatedrefreshToken, generatedaccessToken } =
      await generetAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", generatedaccessToken, options)
      .cookie("refreshToken", generatedrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            refreshToken: generatedrefreshToken,
            accessToken: generatedaccessToken,
          },
          "AccessToken refreshd"
        )
      );
  } catch (error) {
    throw new Apierror(401, error?.message || "invalid refresh token");
  }
});

const chnageCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPassCorrect = user.isPassWordCorrect(oldPassword);

  if (!isPassCorrect) {
    throw new Apierror(400, "old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    throw new Apierror(200, "no Active/logedIn User");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, currentUser, "Current user fetch successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!(fullName, email)) {
    throw new Apierror(400, "email and fullname is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      fullName,
      email,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarlocalFile = req.file?.path;

  if (!avatarlocalFile) {
    throw new Apierror(400, "Avatar File is missing");
  }

  const avatar = await uploadToCloudinary(avatarlocalFile);
  if (!avatar.url) {
    throw new Apierror(
      400,
      "Error while uploading Avatar to cloudinary while updating it "
    );
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { avatar: avatar.url },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Updated AvatarImage"));
});
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverlocalFile = req.file?.path;

  if (!coverlocalFile) {
    throw new Apierror(400, "CoverImage File is missing");
  }

  const cover = await uploadToCloudinary(coverlocalFile);
  if (!cover.url) {
    throw new Apierror(
      400,
      "Error while uploading CoverImage to cloudinary while updating it "
    );
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { coverImage: cover.url },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, user, "Updated CoverImage"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  // const {username} = req.body;

  if (!username?.trim()) {
    throw new Apierror(400, "username is needed");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        channelSubscibedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        isSubscribed: 1,
        channelSubscibedToCount: 1,
        subscriberCount: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new Apierror(400, "Channel Dose NOt Exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, channel[0], "user channel fetchd "));
});

const getWatchHistory = asyncHandler(async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "watchHistory",
          foreignField: "_id",
          as: "watchHistory",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                  {
                    $project: {
                      fullName: 1,
                      username: 1,
                      avatar: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                owner: {
                  $first: "$owner",
                },
              },
            },
          ],
        },
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, user[0].watchHistory, "History Fetched"));
  } catch (error) {
    throw new Apierror(500, error.message || "Aggregaet Error userControler");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccesToken,
  chnageCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
