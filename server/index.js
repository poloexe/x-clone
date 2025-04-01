import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongoDb.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { authUser } from "./middleware/authUser.js";
import { v2 as cloudinary } from "cloudinary";
import postRouter from "./routes/postRouter.js";
import notificationRouter from "./routes/notificationRouter.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", authUser, userRouter);
app.use("/api/post", authUser, postRouter);
app.use("/api/notification", authUser, notificationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  connectMongoDb();
});
