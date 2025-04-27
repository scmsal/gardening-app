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

const API_CALLS_ENABLED = false; // set to true when you want to enable again

const PerenualAPISearchEndpoint =
  "https://perenual.com/plant-species-database-search-finder/species/";

//need to refine this or take it out as it would have to be manually added to each new plant.Also, would have to include filtering logic to the buttons in queryGroup
const edibleParts = ["any", "tubers/bulbs", "leaves/stems", "fruit/pods/seeds"];

export {
  plantNamesList,
  API_KEY,
  edibleParts,
  PerenualAPISearchEndpoint,
  API_CALLS_ENABLED,
};
