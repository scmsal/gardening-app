// DATA ACCESS LAYER: This module provides functions to interact with the food plant database
import foodPlantModel from "./models/plantModel.js";

//Function to fetch all food plants
const fetchAllFoodPlants = async () => {
  const foodPlants = await foodPlantModel.find();
  return foodPlants;
};

//function to fetch an array of all the food plant names

const fetchAllFoodPlantNames = async () => {
  const foodPlants = await foodPlantModel.find({}, "common_name");
  return foodPlants.map((plant) => plant.common_name);
};

//function to fetch a food plant by its common name
const fetchFoodPlantByCommonName = async (commonName) => {
  const foodPlant = await foodPlantModel.findOne({ common_name: commonName });
  return foodPlant;
};

// Exporting the functions to be used in other parts of the application and for testing
export {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
};
