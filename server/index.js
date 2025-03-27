import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongoDb.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  connectMongoDb();
});
