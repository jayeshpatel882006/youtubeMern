import express from "express";
import cors from "cors";
import cookaiParser from "cookie-parser"
import bodyParser from "body-parser";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static("public"));
app.use(cookaiParser());
app.use(express.json());

//Router Starrts From hear
//import all Route
import UserRouter from "./routes/user.routes.js";
import VideoRouter from "./routes/video.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import CommentRouter from "./routes/comment.routes.js";
import helthCheck from "./routes/helthCheck.routes.js";
//user Of Route
app.use("/check", helthCheck);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/video", VideoRouter);
app.use("/api/v1/subscriptions", SubscriptionRouter);
app.use("/api/v1/comment", CommentRouter);

export { app };




