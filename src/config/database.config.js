// import { connect } from "mongoose";
// import { MONGODB_URL } from "../utils/secret.js";

// export const connectDB = async () => {
//   try {
//     await connect(MONGODB_URL);
//     console.log("Database connected successfully:");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// };
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGODB_URL } from "../utils/secret.js";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
