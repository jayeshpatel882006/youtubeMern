import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { uploadToCloudinary } from "../utils/cloudinery.js";

const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //     message: "ok",
  //   });
  const { email, password, fullName, username } = req.body;
  if (
    [email, password, fullName, username].some((field) => field?.trim() === "")
  ) {
    throw new Apierror(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new Apierror(409, "User is alredy existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
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

export { registerUser };
