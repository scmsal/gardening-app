// DATA ACCESS LAYER: This module provides functions to interact with the food plant database
import foodPlantModel from "./models/plantModel.js";

//Function to fetch all food plants
const fetchAllFoodPlants = async () => {
  const foodPlants = await foodPlantModel.find().sort({ common_name: 1 });
  return foodPlants;
};

//function to fetch an array of all the food plant names

const fetchAllFoodPlantNames = async () => {
  const foodPlants = await foodPlantModel
    .find({}, "common_name")
    .sort({ common_name: 1 });
  return foodPlants.map((plant) => plant.common_name);
};

//function to fetch a food plant by its common name
const fetchFoodPlantByCommonName = async (commonName) => {
  const foodPlant = await foodPlantModel.findOne({ common_name: commonName });
  return foodPlant;
};

const fetchHerbs = async () => {
  const herbs = await foodPlantModel
    .find({ type: "Herb" })
    .sort({ common_name: 1 });
  return herbs;
};

const fetchVegetables = async () => {
  const herbs = await foodPlantModel
    .find({ type: "Vegetable" })
    .sort({ common_name: 1 });
  return herbs;
};

// Exporting the functions to be used in other parts of the application and for testing
export {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchHerbs,
  fetchVegetables,
};
