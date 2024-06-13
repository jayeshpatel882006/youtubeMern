import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    //decoding purpos

    //decoding purpos
    // console.log("Header", req.header("Authorization"));
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Apierror(401, "unauthorized request");
    }

    const decodeToken = jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Apierror(401, "invalid AccessToken");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Apierror(401, error.message || "INVALID ACCESS ");
  }
});
