//This file contains the routes and http response messages

import express from "express";
import asyncHandler from "express-async-handler";
import {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
} from "../services/foodPlantService.js";

const foodPlantRouter = express.Router();

//Routes
foodPlantRouter.get(
  "/allFoodPlants",
  asyncHandler(async (req, res) => {
    const data = await fetchAllFoodPlants();
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/listAllNames",
  asyncHandler(async (req, res) => {
    const data = await fetchAllFoodPlantNames();
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/:commonName",
  asyncHandler(async (req, res) => {
    const data = await fetchFoodPlantByCommonName(req.params.commonName);
    res.status(200).json(data);
  })
);

export default foodPlantRouter;
