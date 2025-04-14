import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.mongo_uri || "mongodb://127.0.0.1:27017/x-clone"
    );
    console.log(`Mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectMongoDb;
