import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.config.js";
const PORT = process.env.PORT || 3000;
const MONGO_URI= process.env.MONGO_URI as string

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

await connectDB(MONGO_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
