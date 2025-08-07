import dotenv from "dotenv"; // Importing dotenv to manage environment variables
dotenv.config(); // Loading environment variables from .env file
import express from "express"; // Importing necessary modules
import cors from "cors"; // Importing CORS middleware for handling cross-origin requests

import requestBodyParser from "body-parser";

import errorHandler from "./app/middleware/errorHandlers.js"; // Importing error handling middleware

// Importing database connection function
import connectDatabase from "./app/database/databaseInit.js";

// Importing server port constant
const PORT = process.env.PORT || 5000;
console.log("SERVER PORT:", PORT);

// Importing necessary modules and middleware

/*TO DO:
- Implement error handling middleware
- Implement food plant routes*/

// import errorHandler from "./app/middleware/errorHandlers"; // Importing error handling middleware

// import foodPlantRouter from "./app/routes/foodPlantRoutes"; // Importing food plant routes

const app = express();

// Connecting to the database
connectDatabase();

// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Parsing incoming requests as JSON and handling errors
app.use(express.json());

//TODO: Implement error handling middleware
// app.use(errorHandler);

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
// app.use("/foodPlants", foodPlantRouter);

//=> external API endpoints

// Endpoint to check if the server is running
app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "Server is running.",
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
