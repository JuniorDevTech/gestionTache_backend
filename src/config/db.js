import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Erreur MongoDB", error.message);
    process.exit(1);
  }
};
