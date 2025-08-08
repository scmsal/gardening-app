import dotenv from "dotenv"; // Importing dotenv to manage environment variables
dotenv.config(); // Loading environment variables from .env file
import express from "express"; // Importing necessary modules
import cors from "cors"; // Importing CORS middleware for handling cross-origin requests
import mongoose from "mongoose";

//importing router
import foodPlantRouter from "./app/routes/foodPlantRoutes.js";

// Importing necessary modules and middleware
import requestBodyParser from "body-parser";

import errorHandler from "./app/middleware/errorHandlers.js"; // Importing error handling middleware

// Importing database connection function
import connectDatabase from "./app/database/databaseInit.js";

// Creating an Express application instance
const app = express();
// Parsing incoming requests as JSON and handling errors
app.use(express.json());

// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Connecting to the database
connectDatabase();

// Parsing request bodies
app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// mounting routers for different API endpoints
app.use("/api/", foodPlantRouter);

//=> external API endpoints

// Endpoint to check if the server is running
app.get("/PING", (_, res) => {
  try {
    res.status(200).json("PONG");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Error handling middleware
app.use(errorHandler);

export default app;
