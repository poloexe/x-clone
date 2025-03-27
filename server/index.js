import express from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongoDb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  connectMongoDb();
});

