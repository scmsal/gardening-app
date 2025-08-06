import express from "express"; // Importing necessary modules
import dotenv from "dotenv"; // Importing dotenv to manage environment variables

import cors from "cors"; // Importing CORS middleware for handling cross-origin requests
dotenv.config(); // Loading environment variables from .env file

//Connecting to the database
import connectDatabase from "./app/database/databaseInit"; // Importing database connection function
const PORT = process.env.PORT || 5000; // Importing server port constant

// Importing necessary modules and middleware

import errorHandler from "./app/middleware/errorHandlers"; // Importing error handling middleware

import foodPlantRouter from "./app/routes/foodPlantRoutes"; // Importing food plant routes

const app = express();

// Connecting to the database
connectDatabase();

// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Parsing incoming requests as JSON and handling errors
app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require("body-parser");

// Parsing request bodies
app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Using routers for different API endpoints
app.use("/foodPlants", foodPlantRouter);

//=> external API endpoints

// Endpoint to check if the server is running
app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "Server is running.",
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at port : ${SERVER_PORT}`);
});
