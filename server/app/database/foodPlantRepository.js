import foodPlantModel from "./models/foodPlantModel.js";

//Function to fetch all food plants
const fetchAllFoodPlants = async () => {
  try {
    const foodPlants = await foodPlantModel.find();
    return foodPlants;
  } catch (error) {
    throw new Error("Error fetching food plants");
  }
};

//function to fetch a food plant by its common name
const fetchFoodPlantByCommonName = async (commonName) => {
  try {
    const foodPlant = await foodPlantModel.findOne({ common_name: commonName });
    if (!foodPlant) {
      throw new Error(`Food plant with common name ${commonName} not found`);
    }
  } catch (error) {
    throw new Error("Error fetching food plant by common name");
  }
};
