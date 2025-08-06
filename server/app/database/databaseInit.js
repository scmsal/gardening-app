import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const DATABASE_URI = process.env.DATABASE_URI;
console.log("DATABASE_URI:", DATABASE_URI);
const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URI);

    console.log(
      `Database is connected have ${connection.connection.host} as host and ${connection.connection.port} as port`
    );
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
