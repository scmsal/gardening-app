//This file provides the service layer for food plants, handling read operations and error management. It throws errors that bubble to middleware
import {
  fetchAllFoodPlants as getAllFoodPlantsFromRepo,
  fetchAllFoodPlantNames as getAllFoodPlantNamesFromRepo,
  fetchFoodPlantByCommonName as getFoodPlantByCommonNameFromRepo,
} from "../database/foodPlantRepository.js";

const fetchAllFoodPlants = async () => {
  const plants = await getAllFoodPlantsFromRepo();
  if (!plants || plants.length === 0) {
    const err = new Error("No plants found");
    err.statusCode = 404;
    throw err;
  }
  return plants;
};

const fetchAllFoodPlantNames = async () => {
  const plantNamesList = await getAllFoodPlantNamesFromRepo();
  if (!plantNamesList || plantNamesList.length === 0) {
    const err = new Error("No plants found");
    err.statusCode = 404;
    throw err;
  }
  return plantNamesList;
};

const fetchFoodPlantByCommonName = async (commonName) => {
  const plant = await getFoodPlantByCommonNameFromRepo(commonName);

  if (!plant) {
    const err = new Error(
      `Food plant with common name ${commonName} not found`
    );
    err.statusCode(404);
    throw err;
  }
  return plant;
};

//testing that the functions are exporting as functions
console.log("typeof fetchAllFoodPlants:", typeof fetchAllFoodPlants);

console.log("✅ foodPlantService.js loaded");
console.log("fetchAllFoodPlants:", typeof fetchAllFoodPlants);

// Exporting the functions for use in routes

export {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
};
