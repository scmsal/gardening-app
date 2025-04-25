import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./features/plantsSlice";
import persistPlantData from "./middleware/persistPlantData";

const store = configureStore({
  reducer: {
    plants: plantReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(persistPlantData),
});

export default store;

// const fetchEdibleCarrotData = async () => {
//   try {
//     const response = await axios.get("https://trefle.io/api/v1/species", {
//       params: {
//         filter: "edible:true",
//         q: query,
//       },
//       headers: {
//         Authorization: `Bearer ${"PksvPxd3wVwo32iIA4jjOaC04qHxC9-8a9ETmWTRQJo"}`,
//       },
//     });

//     const filteredData = response.data.data.map((plant) => ({
//       name: plant.common_name,
//       days_to_harvest: plant.main_species?.growth?.days_to_harvest,
//       sowing: plant.main_species?.growth?.sowing,
//       growth_months: plant.main_species?.growth?.growth_months,
//       fruit_months: plant.main_species?.growth?.fruit_months,
//       minimum_root_depth: plant.main_species?.growth?.minimum_root_depth?.cm,
//       minimum_temperature:
//         plant.main_species?.growth?.minimum_temperature?.deg_c,
//     }));

//     console.log(filteredData);
//   } catch (error) {
//     console.error("Error fetching edible carrot data:", error.message);
//   }
// };

// fetchEdibleCarrotData();
