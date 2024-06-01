import { app } from "./app.js";
import connectToDb from "./db/Db.js";
import dotenv from "dotenv"

dotenv.config()

connectToDb()
.then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`Server Runing at PORT : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})