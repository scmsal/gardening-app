import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URI =
  process.env.NODE_ENV !== "development"
    ? process.env.DATABASE_URI
    : process.env.LOCAL_DATABASE_URI;

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.info(
      `Database is connected have ${connection.connection.host} as host and ${connection.connection.port} as port`
    );
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
