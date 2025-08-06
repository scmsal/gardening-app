import mongoose from "mongoose";

import { DATABASE_URI } from "process.env.DATABASE_URI"; // Importing the database URI from environment variables

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `Database is connected have ${connection.connection.host} as host and ${connection.connection.port} as port`
    );
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
