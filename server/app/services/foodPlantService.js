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

const displayWelcome = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome</title>
        <style>
        body {
        font-family: Arial, sans-serif;
        }
         h1 {
        color: green;
        }
        a {
        color: green}
        </style>
      </head>
      <body>
        <h1>Welcome to the Gardening App API</h1>
        <p>Author: Stephanie Salifu</p>
        <p>Explore available endpoints to find information about various edible plants you can grow in your own garden.</p>
        <ul>
          <li><a href="/api/allFoodPlants">Full Edible Plant List</a></li>
          <li><a href="/api/listAllNames">Edible Plant Names</a></li>
          <li><a href="/api/getFoodPlantByCommonName?common_name=Tomato">Get Plant by Common Name (e.g., Tomato)</a></li>
          <li><a href="/api/namesImgs">Edible Plant Names and Images</a></li>
          <li><a href="/api/herbs">Herbs</a></li>
          <li><a href="/api/vegetables">Vegetables</a></li>
        </ul>
        <p>AI tools were used to generate the plant data. Image urls and credits were manually curated.</p>
        <p>You can access the frontend at <a href="https://gardening-app-gules.vercel.app/">https://gardening-app-gules.vercel.app/</a></p>
      </body>
    </html>
    `;
};

// Exporting the functions for use in routes

export {
  fetchAllFoodPlants,
  fetchNamesImgs,
  fetchAllFoodPlantNames,
  fetchFoodPlantByCommonName,
  fetchAllHerbs,
  fetchAllVegetables,
  displayWelcome,
};
