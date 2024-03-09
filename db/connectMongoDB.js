import mongoose from "mongoose";

const connectDB = async () => {
  const DB_NAME = "Mern-Github-Authentication";
  const MONGO_URL =
    "mongodb+srv://sahniak56:8757419868@mern-auth.nv5cyzq.mongodb.net";
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
