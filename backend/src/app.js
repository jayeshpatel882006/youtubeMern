import express from "express";
import cors from "cors";
import cookaiParser from "cookie-parser"

const app = express()

app.use(cors({origin:"*"}))
app.use(express.static("public"))
app.use(cookaiParser())


//Router Starrts From hear
//import all Route
import UserRouter from "./routes/user.routes.js"

//user Of Route
app.use("/api/v1/users",UserRouter)


export {app}