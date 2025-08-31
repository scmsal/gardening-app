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

//Function to fetch names and images of food plants for display in UI as cards. Still needs debugging. Not in use yet.
const fetchNamesImgs = async () => {
  const namesImgs = await foodPlantModel.aggregate([
    {
      $project: { common_name: 1, image_url: "$image_info.image_url", _id: 0 },
    },
  ]);

  return namesImgs.map((plant) => {
    return {
      common_name: plant.common_name,
      image_url: plant.image_url || null,
    };
  });
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

fetchNamesImgs();
// Exporting the functions to be used in other parts of the application and for testing
export {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchHerbs,
  fetchVegetables,
  fetchNamesImgs,
};
