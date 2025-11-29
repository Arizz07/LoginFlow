// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "userDB", // or whatever name you chose
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:");
    console.error("   message:", error.message);
    console.error("   name:", error.name);
    console.error("   code:", error.code);
    throw error; // rethrow so API route knows it failed
  }
};
