import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//I Added This dotenv hear because it give error when this is not present in this file
import dotenv from "dotenv";
// import { log } from "console";
dotenv.config();


//I Used jayeshwatchface(github account) to login in cloudinwry
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

const deleteFromClodinery = async (publicId, type) => {
  try {
    if (!publicId) {
      return console.log("Public id is required for deleting ");
    }

    if (type == "image") {
      const res = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
      // console.log(res);
    } else if (type == "video") {
      const res = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
      // console.log(res);
    }

    // console.log(publicId);
  } catch (error) {
    console.log("cloudinery deliting err : ", error);
  }
};

export { uploadToCloudinary, deleteFromClodinery };
