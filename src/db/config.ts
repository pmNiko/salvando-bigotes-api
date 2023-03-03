import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CNN || "");
    console.log("Connect DB.");
  } catch (err) {
    console.log(err);
    throw new Error("Error init connection DB.");
  }
};

export default dbConnection;
