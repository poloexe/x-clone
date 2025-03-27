import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_uri);
    console.log(`Mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectMongoDb;
