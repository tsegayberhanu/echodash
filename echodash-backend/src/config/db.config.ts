import "dotenv/config";
import mongoose from "mongoose";
const connectDB = async (mongoURI: string): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;