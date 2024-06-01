import express from "express";
import cors from "cors";
import cookaiParser from "cookie-parser"

const app = express()

app.use(cors({origin:"*"}))
app.use(express.static("public"))
app.use(cookaiParser())




export {app}