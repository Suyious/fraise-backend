import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// config
if(process.env.NODE_ENV !== 'production'){
  dotenv.config({path: "./config/config.env"})
}

const app = express();
app.use(express.json());    // remember the parentheses
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN.split(" ")}));

app.get("/", (_, res) => {
  res.send("<code>✅ Server is up and Running!</code>");
})

export default app;
