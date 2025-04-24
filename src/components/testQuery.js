// filename: testTrefle.js
import axios from "axios";

import { veggieList } from "../storage.js";

const API_TOKEN = "PksvPxd3wVwo32iIA4jjOaC04qHxC9-8a9ETmWTRQJo";
const queryVeg = "wheat";

try {
  // Step 1: Search by common name
  const response = await axios.get("https://trefle.io/api/v1/species", {
    params: {
      "filter[common_name]": queryVeg,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  // Step 2: Find the exact match
  const match = response.data.data.find(
    (plant) => plant.common_name?.toLowerCase() === queryVeg.toLowerCase()
  );
  if (!match) {
    throw new Error(`No exact match found for "${queryVeg}"`);
  }

  // Step 3: Use the match.id to get detailed data
  const infoFromId = await axios.get(
    `https://trefle.io/api/v1/species/${match.id}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  const species = infoFromId.data.data;

  const filteredData = {
    name: species.common_name || "Unknown",
    trefleID: species.id || "Unknown",
    days_to_harvest: species.main_species?.growth?.days_to_harvest ?? "N/A",
  };

  console.log(filteredData);
} catch (error) {
  console.error("Error fetching data:", error.message);
}

/*-------*/
// const filteredData = match.data.data.map((plant) => ({
//   name: plant.common_name || "Unknown",
//   trefleID: plant.id || "Unknown",
//   days_to_harvest: plant.id.main_species?.growth?.days_to_harvest ?? "N/A",
// sowing: plant.main_species?.growth?.sowing ?? "N/A",
// growth_months: plant.main_species?.growth?.growth_months ?? [],
// fruit_months: plant.main_species?.growth?.fruit_months ?? [],
// minimum_root_depth:
//   plant.main_species?.growth?.minimum_root_depth?.cm ?? "N/A",
// minimum_temperature:
//   plant.main_species?.growth?.minimum_temperature?.deg_c ?? "N/A",
// }));

// console.log(filteredData);

//   const detailResponse = await axios.get(
//     `https://trefle.io/api/v1/species/${filteredData.trefleID}`,
//     {
//       headers: {
//         Authorization: `Bearer ${API_TOKEN}`,
//       },
//     }
//   );

//   const daysToHarvest =
//     detailResponse.data.data.main_species?.growth?.days_to_harvest;
//   console.log(`${filteredData.name} takes ${daysToHarvest} days to harvest.`);
// } catch (error) {
//   console.error("Error fetching data:", error.message);
// }

//

// const updateVeggieUrls = async (veggies) => {
//   for (let veggie of veggies) {
//     try {
//       const res = await axios.get("https://trefle.io/api/v1/plants", {
//         params: {
//           q: veggie.name,
//           "filter[edible]": "true",
//         },
//         headers: {
//           Authorization: `Bearer ${API_TOKEN}`,
//         },
//       });

//       const match = res.data.data.find((plant) =>
//         plant.common_name?.toLowerCase().includes(veggie.name.toLowerCase())
//       );
//       console.log(plant.common_name);
//       // if (match) {
//       //   veggie.url = match.links.self; // or match.slug or whatever field you want
//       // } else {
//       //   veggie.url = "Not found";
//       // }
//     } catch (err) {
//       console.error(`Failed for ${veggie.name}:`, err.message);
//       veggie.url = "Error fetching";
//     }
//   }

//   return veggies;
// };

// // Call it
// updateVeggieUrls(veggieObjects);

// axios
//   .get("https://trefle.io/api/v1/plants", {
//     params: {
//       q: "lettuce",
//       "filter[edible]": "true",
//     },
//     headers: {
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//   })

//   .then((res) => {
//     const queryOnly = res.data.data.filter((plant) =>
//       plant.common_name?.toLowerCase().includes("lettuce")
//     );

//     console.log(queryOnly);
//   })
//   .catch((err) => console.error(err));

///
const urlSearch = `https://trefle.io/api/v1/plants?token=PksvPxd3wVwo32iIA4jjOaC04qHxC9-8a9ETmWTRQJo&filter%5Bcommon_name%5D=pea`;
