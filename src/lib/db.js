
import mongoose from "mongoose";
// export const connectionURL = process.env.MONGODB_URL;
// await mongoose.connect(connectionURL);

const connectionURL = process.env.MONGODB_URL;
export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose;
    }

    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
    return mongoose; // Exporting connected mongoose instance
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
};
