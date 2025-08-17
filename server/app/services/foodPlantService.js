//This file provides the service layer for food plants, handling read operations and error management. It throws errors that bubble to middleware
import {
  fetchAllFoodPlants as getAllFoodPlantsFromRepo,
  fetchAllFoodPlantNames as getAllFoodPlantNamesFromRepo,
  fetchFoodPlantByCommonName as getFoodPlantByCommonNameFromRepo,
  fetchHerbs as getHerbsFromRepo,
  fetchVegetables as getVegetablesFromRepo,
  fetchNamesImgs as fetchNamesImgsFromRepo,
} from "../database/foodPlantRepository.js";

const fetchAllFoodPlants = async () => {
  const plants = await getAllFoodPlantsFromRepo();
  if (!plants || plants.length === 0) {
    console.log("Fetching all food plants from DB");
    const err = new Error("No plants found");
    err.statusCode = 404;
    throw err;
  }
  return plants;
};

const fetchNamesImgs = async () => {
  const plants = await fetchNamesImgsFromRepo();
  if (!plants || plants.length === 0) {
    console.log("Fetching all food plants from DB");
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
    err.statusCode = 404;
    throw err;
  }
  return plant;
};

const fetchAllHerbs = async () => {
  const herbs = await getHerbsFromRepo();
  if (!herbs || herbs.length === 0) {
    const err = new Error("No herbs found");
    err.statusCode = 404;
    throw err;
  }
  return herbs;
};

const fetchAllVegetables = async () => {
  const vegetables = await getVegetablesFromRepo();
  if (!vegetables || vegetables.length === 0) {
    const err = new Error("No vegetables found");
    err.statusCode = 404;
    throw err;
  }
  return vegetables;
};

// Exporting the functions for use in routes

export {
  fetchAllFoodPlants,
  fetchNamesImgs,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchAllHerbs,
  fetchAllVegetables,
};
