import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../config";
import { PerenualAPISearchEndpoint } from "../config";
import placeholderImg from "../assets/icons8-plant-80.png";
import delay from "../../utils/delay";
import { saveDetailsEnriched } from "../../utils/localStorageHelpers"; //check if still needed
import { API_CALLS_ENABLED } from "../config";

const persistState = (plantData, detailsEnriched) => {
  localStorage.setItem("plantData", JSON.stringify(plantData));
  localStorage.setItem("detailsEnriched", JSON.stringify(detailsEnriched));
};

export const loadStarterPlants = createAsyncThunk(
  "plants/loadStarterPlants",
  async (_, thunkAPI) => {
    console.log("loadStarterPlants thunk is firing");
    try {
      const response = await fetch("/starterPlants.json");
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Starter plants data:", data);
      return data;
    } catch (error) {
      console.error("loadStarterPlants error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPlantByName = createAsyncThunk(
  "plants/addPlantByName",
  async (general_name, { getState, dispatch }) => {
    if (!API_CALLS_ENABLED) {
      console.warn("API calls are currently disabled.");
      return thunkAPI.rejectWithValue("API calls disabled manually.");
    }

    const state = getState();
    const exists = state.plants.plantData.some(
      (plant) => plant.general_name.toLowerCase() === general_name.toLowerCase()
    );

    if (exists) return;

    const response = await axios.get(
      `https://perenual.com/api/species-list?key=${API_KEY}&q=${general_name}`
    );

    const plant = response.data.data?.[0];
    if (!plant) return null;

    const {
      common_name,
      scientific_name,
      API_id,
      edible,
      poisonous,
      watering,
      sunlight,
      cycle,
      hardiness,
      default_image,
    } = plant;

    const newPlant = {
      general_name, //check if needs to be :general_name
      common_name,
      scientific_name,
      // id: 1,
      API_id,
      // edible_part: "unknown",
      watering,
      sunlight,
      cycle,
      edible,
      poisonous,
      hardiness,
      image: default_image?.small_url || null, //see if that works instead of null
      guideURL: PerenualAPISearchEndpoint + plant.id,
      enriched: false,
    };
    dispatch(addPlant(newPlant));
    dispatch(enrichPlantDetails({ general_name, API_id: plant.id })); //check general_name
  }
);
//Might be unnecessary. I thought it could work for the plants with aPI_id > 3000, but it won't. I'l pull all the info from /details
// export const addBasicPlantDetails = createAsyncThunk(
//   "plants/addBasicPlantDetails",
//   async ({ general_name, API_id }, thunkAPI) => {
//     if (API_id > 3000) {
//       console.warn(
//         `Skipping addBasicPlantDetails for ${general_name}, API_id too high: ${API_id}`
//       );
//       return null;
//     }
//     try {
//       const response = await axios.get(
//         `https://perenual.com/api/species-list?key=${API_KEY}&q=${general_name}}`
//       );
//       const plant = response.data.data[0];
//       if (!plant) return null;

//       console.log("details:", details);
//       console.log("Received:", { general_name, API_id });
//       return {
//         API_id,
//         watering: plant.watering,
//         sunlight: plant.sunlight,
//         cycle: plant.cycle,
//         edible: plant.edible,
//         poisonous: plant.poisonous,
//         hardiness: plant.hardiness,
//         image: plant.default_image?.small_url || placeholderImg,
//       };
//     } catch (error) {
//       console.error(`Failed to add basic details for ${general_name}:`, error);
//       return null;
//     }
//   }
// );

//This thunk is to add info from the details pages of the plants by ID (not available in the species-list endpoint) into the basic info list (i.e. enrich the data)

//for a single plant
export const enrichPlantDetails = createAsyncThunk(
  "plants/enrichPlantDetails",
  async ({ general_name, API_id }, thunkAPI) => {
    if (!API_CALLS_ENABLED) {
      console.warn("API calls are currently disabled.");
      return thunkAPI.rejectWithValue("API calls disabled manually.");
    }

    console.log("enrichPlantDetails has fired with: ", general_name, API_id); //check if need plant.general_name
    if (API_id > 3000) {
      console.warn(
        `Skipping enrichment for ${general_name}, API_id too high: ${API_id}` //check if need plant.general_name
      );
      return null;
    }
    console.log("About to call API for", API_id);
    try {
      const response = await axios.get(
        `https://perenual.com/api/species/details/${API_id}?key=${API_KEY}`
      );
      const details = response.data;
      console.log("details:", details);
      console.log("Received:", { general_name, API_id });
      return {
        general_name: details.general_name,
        API_id: details.API_id,
        details: {
          care_level: details.care_level,
          cycle: details.cycle,
          drought_tolerant: details.drought_tolerant,
          edible: details.edible,
          enriched: true,
          flowering_season: details.flowering_season,
          flowers: details.flowers,
          growth_rate: details.growth_rate,
          hardiness: details.hardiness,
          harvest_season: details.harvest_season,
          image: details.default_image?.small_url || placeholderImg,
          poisonous: details.poisonous,
          sunlight: details.sunlight,
          type: details.type,
          watering: details.watering,
        },
      };
    } catch (error) {
      console.error(`Failed to enrich ${details.general_name}:`, error); //check if need just eneral_name
      return null;
    }
  }
);

//for all the plants on the plantData list at once
export const enrichAllPlantDetails = createAsyncThunk(
  "plants/enrichAllPlantDetails",

  async (_, { getState, dispatch }) => {
    if (!API_CALLS_ENABLED) {
      console.warn("API calls are currently disabled.");
      return thunkAPI.rejectWithValue("API calls disabled manually.");
    }

    console.log("enrichAllPlantDetails has fired.");
    const { plantData } = getState().plants;

    for (const plant of plantData) {
      if (plant.API_id && !plant.enriched) {
        const actionResult = await dispatch(
          enrichPlantDetails({
            general_name: plant.general_name.toLowerCase(),
            API_id: plant.API_id,
          })
        );

        if (enrichPlantDetails.fulfilled.match(actionResult)) {
          if (actionResult.payload === null) {
            console.log(`Skipped enrichment for ${plant.general_name}`);
            continue;
          }
        } else {
          console.error(
            `Failed enrichment for ${plant.general_name}`,
            actionResult.error
          );
          continue;
        }
        await delay(1200);
      }
    }
    dispatch(setDetailsEnriched(true));
  }
);

const cachedPlantData = JSON.parse(localStorage.getItem("plantData")) || [];

const cachedDetailsEnriched =
  JSON.parse(localStorage.getItem("detailsEnriched")) || false;

const initialState = {
  plantData: cachedPlantData,
  selectedPlant: null,
  loading: false,
  error: null,
  detailsEnriched: cachedDetailsEnriched,
};

//create the slice
const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addPlant: (state, action) => {
      state.plantData.push(action.payload);
    },

    removePlant: (state, action) => {
      const plantToRemove = action.payload.toLowerCase();
      state.plantData = state.plantData.filter(
        (plant) => plant.common_name.toLowerCase() !== plantToRemove //check if should use general_name instead
      );
    },

    setSelectedPlant: (state, action) => {
      state.selectedPlant = action.payload;
    },
    setDetailsEnriched: (state, action) => {
      state.detailsEnriched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStarterPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStarterPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plantData = action.payload;
        persistState(state.plantData, state.detailsEnriched);
      })

      .addCase(loadStarterPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //deleted addCase(addPlantByName.fulfilled because it dispatches addPlant, so not needed.

      // .addCase(addBasicPlantDetails.fulfilled, (state, action) => {
      //   persistState(state.plantData, state.detailsEnriched);
      // })
      .addCase(enrichPlantDetails.fulfilled, (state, action) => {
        if (!action.payload) return; //not sure if I need this
        const { general_name, API_id, details } = action.payload;
        const index = state.plantData.findIndex(
          (plant) => plant.API_id === API_id
        );
        if (index !== -1) {
          state.plantData[index] = {
            ...state.plantData[index],
            ...details,
          };
          //Persist to localStorage
          persistState(state.plantData, state.detailsEnriched);
        }
      });
  },
});
// Export the actions for use in components
export const { setSelectedPlant, addPlant, removePlant, setDetailsEnriched } =
  plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
