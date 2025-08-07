import express from "express";
const foodPlantRouter = express.Router();

import {
  fetchAllFoodPlants,
  fetchFoodPlantByCommonName,
} from "../database/foodPlantRepository.js";

foodPlantRouter.route("/").get(fetchAllFoodPlants);
foodPlantRouter.route("/:commonName").get(fetchFoodPlantByCommonName);

export default foodPlantRouter;
