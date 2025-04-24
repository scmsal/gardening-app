import { edibleParts } from "../constants";

// Perenual

const plantList = [
  {
    basil: {
      general_name: "basil",
      common_name: "sweet basil",
      scientific_name: "Ocimum basilicum",
      id: 1,
      API_id: 5497,
      edible_part: "leaves",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/5497",
    },
    bean: {
      general_name: "bean",
      common_name: "broad bean, fava bean",
      scientific_name: "Vicia faba",
      id: 2,
      API_id: 8788,
      edible_part: "pods",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/8788",
    },
    "bell pepper": {
      general_name: "bell pepper",
      common_name: "sweet bell pepper",
      scientific_name: "Capsicum annuum 'Park's Early Thickset'",
      id: 3,
      API_id: 1602,
      edible_part: "fruit",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/1602",
    },
    // "broccoli",
    carrot: {
      general_name: "carrot",
      common_name: "carrot",
      scientific_name: "Daucus carota var. sativus",
      id: 5,
      API_id: 2320,
      edible_part: "tuber",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/2320",
    },
    chard: {
      general_name: "chard",
      common_name: "Swiss chard",
      scientific_name: "Beta vulgaris (Leaf Beet Group)",
      id: 6,
      API_id: 1275,
      edible_part: "leaves",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/1275",
    },
    dill: {
      general_name: "dill",
      common_name: "dill",
      scientific_name: "Anethum graveolens",
      id: 7,
      API_id: 834,
      edible_part: "leaves",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/834",
    },
    kale: {
      general_name: "kale",
      common_name: kale,
      scientific_name: "Brassica oleracea (Acephala Group) 'Redbor'",
      id: 8,
      API_id: 1320,
      edible_part: "leaves",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/1320",
    },
    lettuce: {
      general_name: "lettuce",
      common_name: "lettuce",
      scientific_name: "Lactuca sativa",
      id: 9,
      API_id: 4626,
      edible_part: "leaves",
      guideURL:
        " https://perenual.com/plant-species-database-search-finder/species/4626}",
    },
    onion: {
      general_name: "onion",
      common_name: "onion",
      scientific_name: "Allium altaicum",
      id: 10,
      API_id: 663,
      edible_part: "bulb",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/663",
    },
    // "pea" 11,

    potato: {
      general_name: "potato",
      common_name: "potato",
      scientific_name: "Solanum tuberosum",
      id: 12,
      API_id: 7409,
      edible_part: "tuber",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/7409",
    },
    sage: {
      general_name: "sage",
      common_name: "common sage",
      scientific_name: "Salvia officinalis 'Aurea'",
      id: 13,
      API_id: 7095,
      edible_part: "leaves",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/7095",
    },
    // "thyme" 14,
    tomato: {
      general_name: "tomato",
      common_name: "tomato",
      scientific_name: "Lycopersicon esculentum",
      id: 15,
      API_id: 5021,
      edible_part: "fruit",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/5021",
    },
    zucchini: {
      general_name: "zucchini",
      common_name: "summer squash / zucchini",
      scientific_name: "Cucurbita pepo",
      id: 16,
      API_id: 2255,
      edible_part: "fruit",
      guideURL:
        "https://perenual.com/plant-species-database-search-finder/species/2255",
    },
  },
];
// [plantName]: {
//             name: plant.common_name || "Unknown",
//             id: index + 1,
//             API_id: plant.id,
//             scientific_name: plant.scientific_name,
//             hardiness_zone: plant.hardiness,
//             edible: plant.edible,
//             duration: plant.cycle || "Unknown",
//             sunlight: plant.sunlight || "Unknown",
//             watering: plant.watering || "Unknown",
//             flowering_season: plant.flowering_season || "Unknown",
//             growth_rate: plant.growth_rate || "Unknown",
//             care_level: plant.care_level || "Unknown",
//             image: plant.default_image?.medium_url || null,
//           },

// common sage
// Salvia officinalis 'Sage of Bath'
// https://perenual.com/plant-species-database-search-finder/species/7100

// lettuce
// Lactuca sativa 'Merlot'
// https://perenual.com/plant-species-database-search-finder/species/4627
