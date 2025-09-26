import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import foodPlantRouter from "./app/routes/foodPlantRouter.js";
import { displayWelcome } from "./app/services/foodPlantService.js";
import requestBodyParser from "body-parser";
import errorHandler from "./app/middleware/errorHandlers.js";
import connectDatabase from "./app/database/databaseInit.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.info("Request received: ", req.method, req.url);
  next();
});

//=== Connecting to the database===
// Make sure the server does not connect to the real database during tests. It should only use the sample database using mongodb-memory-server in the test files.
if (process.env.NODE_ENV !== "test") {
  try {
    connectDatabase();
  } catch (err) {
    console.error(err.message);
  }
}

app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// ===mounting routers for different API endpoints===
app.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const data = await displayWelcome();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  })
);

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

app.use("/api/", foodPlantRouter);
app.use(errorHandler);
export default app;
