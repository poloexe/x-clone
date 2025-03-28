import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongoDb.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { authUser } from "./middleware/authUser.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", authUser, userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  connectMongoDb();
});
