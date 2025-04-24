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

const API_KEY = "0000"; //import.meta.env.VITE_PERENUAL_API_KEY;

const PerenualAPISearchEndpoint =
  "https://perenual.com/plant-species-database-search-finder/species/";

const edibleParts = ["any", "tubers/bulbs", "leaves/stems", "fruit/pods/seeds"];

export { plantNamesList, API_KEY, edibleParts, PerenualAPISearchEndpoint };
