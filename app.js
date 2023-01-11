import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// config
if(process.env.NODE_ENV !== 'production'){
  console.log("[ The server is running in a development environment ]")
  dotenv.config({path: "./config/config.env"})
}

import ErrorMiddleware from "./middleware/errors.js";

const app = express();
app.use(express.json({limit: '5mb'}));    // remember the parentheses
app.use(express.urlencoded({extended: true, limit: '5mb'}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN.split(" ")}));

import user from "./route/user.js"
import blog from "./route/blog.js"

app.get("/", (_, res) => {
  res.send("<code>✅ Server is up and Running!</code>");
})

app.use("/", user);
app.use("/", blog);

// Middlewares
app.use(ErrorMiddleware);

export default app;
