import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const URI= process.env.MONGO_URI;

  if (!URI) {
    throw new Error("URI environment variable is not defined");
  }

  try {
    const conn = await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // when you do await connectDB() without this, it will NOT reject — it will resolve successfully, even though the DB failed to connect!
  }
};
