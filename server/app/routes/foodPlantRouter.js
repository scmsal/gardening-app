//This file contains the routes and http response messages

import express from "express";
import asyncHandler from "express-async-handler";
import {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchAllHerbs,
  fetchAllVegetables,
  fetchNamesImgs,
} from "../services/foodPlantService.js";

const foodPlantRouter = express.Router();

//Routes
foodPlantRouter.get(
  "/allFoodPlants",
  asyncHandler(async (req, res) => {
    const data = await fetchAllFoodPlants();
    console.log("Route hit");
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/namesImgs",
  asyncHandler(async (req, res) => {
    const data = await fetchNamesImgs();
    console.log("Route hit");
    res.status(200).json(data);
  })
);
foodPlantRouter.get(
  "/listAllNames",
  asyncHandler(async (req, res) => {
    const data = await fetchAllFoodPlantNames();
    console.log("Route hit");
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/getFoodPlantByCommonName",
  asyncHandler(async (req, res) => {
    const data = await fetchFoodPlantByCommonName(req.query.common_name);
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/herbs",
  asyncHandler(async (req, res) => {
    const data = await fetchAllHerbs();
    res.status(200).json(data);
  })
);

foodPlantRouter.get(
  "/vegetables",
  asyncHandler(async (req, res) => {
    const data = await fetchAllVegetables();
    res.status(200).json(data);
  })
);
export default foodPlantRouter;
