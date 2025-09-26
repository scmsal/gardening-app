import foodPlantModel from "./models/plantModel.js";

const fetchAllFoodPlants = async () => {
  const foodPlants = await foodPlantModel.find().sort({ common_name: 1 });
  return foodPlants;
};

const fetchAllFoodPlantNames = async () => {
  const foodPlants = await foodPlantModel
    .find({}, "common_name")
    .sort({ common_name: 1 });
  return foodPlants.map((plant) => plant.common_name);
};

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

export {
  fetchAllFoodPlants,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchHerbs,
  fetchVegetables,
  fetchNamesImgs,
};
