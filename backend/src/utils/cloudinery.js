import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//I Added This dotenv hear because it give error when this is not present in this file
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRATE,
  // cloud_name: "dygl9cjyd",
  // api_key: "835721999589524",
  // api_secret: "EzNGUPgJQ0hHtqqReoJHyzYYPCg",
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File Uploaded to cludenery", response.url);
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log("photo err : ", error);
    fs.unlinkSync(localFilePath);
  }
};

export { uploadToCloudinary };
