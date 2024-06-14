import mongoose from "mongoose";
import { DB_Name } from "../constents.js";

const connectToDb=async()=>{
    try {
      // console.log(process.env.MONGO_URI);
      //i used jayu07498@gmail account in mongodb atlas to login
      const conn = await mongoose
        .connect(`${process.env.MONGO_URI}/${DB_Name}`)
        .then(() => {
          console.log("! Connection Done To Db!");
        });
    } catch (error) {
        console.log("Database Error : " , error);
    }
}

export default connectToDb;