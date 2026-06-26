import mongoose from "mongoose";

// Connect to MongoDB Atlas using the connection string comes from the .env file.
try {
  await mongoose.connect(process.env.ATLAS_URI);
  console.log("Connected to MongoDB with Mongoose");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Export mongoose so the rest of the app can use the active connection.
export default mongoose;
