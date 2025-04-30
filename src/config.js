const plantNamesList = [
  "basil",
  "bean",
  "bell pepper",
  "broccoli",
  "carrot",
  "chard",
  "dill",
  "kale",
  "lettuce",
  "onion",
  "pea",
  "potato",
  "sage",
  "thyme",
  "tomato",
  "zucchini",
];

const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;
const RAPDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const API_CALLS_ENABLED = true; // Toggles ability to make calls to Perenual API

const PerenualAPISearchEndpoint =
  "https://perenual.com/plant-species-database-search-finder/species/";

//need to refine this or take it out as it would have to be manually added to each new plant.Also, would have to include filtering logic to the buttons in queryGroup. Alternatively, add the plants as arrays to the respective variables.
const edibleParts = ["any", "tubers/bulbs", "leaves/stems", "fruit/pods/seeds"];

export {
  plantNamesList,
  API_KEY,
  RAPDAPI_KEY,
  edibleParts,
  PerenualAPISearchEndpoint,
  API_CALLS_ENABLED,
};
