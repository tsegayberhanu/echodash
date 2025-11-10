import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

 mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: any) => {
    console.log("mongodb connection error", err);
    process.exit(1);
  });
