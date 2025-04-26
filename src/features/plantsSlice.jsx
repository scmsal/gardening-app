// features/plants/plantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../constants";
import { PerenualAPISearchEndpoint } from "../constants";
import placeholderImg from "../assets/icons8-plant-80.png";
// import plantObjectsList from "../components/PlantObjectsList";

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
  async (plantName, { getState, dispatch }) => {
    const state = getState();
    const exists = state.plants.plantData.some(
      (plant) => plant.general_name.toLowerCase() === plantName.toLowerCase()
    );

    if (exists) return;

    const response = await axios.get(
      `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
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
      general_name: plantName,
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
    dispatch(enrichPlantDetails({ plantName, API_id: plant.id }));
  }
);

export const addBasicPlantDetails = createAsyncThunk(
  "plants/addBasicPlantDetails",
  async ({ plantName, API_id }, thunkAPI) => {
    if (API_id > 3000) {
      console.warn(
        `Skipping addBasicPlantDetails for ${plantName}, API_id too high: ${API_id}`
      );
      return null;
    }
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
      );
      const plant = response.data.data[0];
      if (!plant) return null;

      console.log("details:", details);
      console.log("Received:", { plantName, API_id });
      return {
        API_id,
        watering: plant.watering,
        sunlight: plant.sunlight,
        cycle: plant.cycle,
        edible: plant.edible,
        poisonous: plant.poisonous,
        hardiness: plant.hardiness,
        image: plant.default_image?.small_url || placeholderImg,
      };
    } catch (error) {
      console.error(`Failed to add basic details for ${plantName}:`, error);
      return null;
    }
  }
);

//This thunk is to add info from the details pages of the plants by ID (not available in the species-list endpoint) into the basic info list (i.e. enrich the data)

//for a single plant
export const enrichPlantDetails = createAsyncThunk(
  "plants/enrichPlantDetails",
  async ({ plantName, API_id }, thunkAPI) => {
    console.log("enrichPlantDetails has fired with: ", plantName, API_id);
    if (API_id > 3000) {
      console.warn(
        `Skipping enrichment for ${plantName}, API_id too high: ${API_id}`
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
      console.log("Received:", { plantName, API_id });
      return {
        plantName,
        API_id,
        details: {
          care_level: details.care_level,
          enriched: true,
          flowering_season: details.flowering_season,
          flowers: details.flowers,
          growth_rate: details.growth_rate,
          harvest_season: details.harvest_season,
          drought_tolerant: details.drought_tolerant,
          type: details.type,
        },
      };
    } catch (error) {
      console.error(`Failed to enrich ${plantName}:`, error);
      return thunkAPI.rejectWithValue({ plantName, reason: error.message });
    }
  }
);

//for all the plants on the plantData list at once
export const enrichAllPlantDetails = createAsyncThunk(
  "plants/enrichAllPlantDetails",

  async (_, { getState, dispatch }) => {
    console.log("enrichAllPlantDetails has fired.");
    const { plantData } = getState().plants;

    for (const plant of plantData) {
      if (plant.API_id && !plant.enriched) {
        await dispatch(
          enrichPlantDetails({
            plantName: plant.common_name.toLowerCase(),
            API_id: plant.API_id,
          })
        );
        await delay(1200);
      }
    }

    dispatch(setDetailsEnriched(true));
  }
);

//create the slice

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
      saveDetailsEnriched(state.detailsEnriched);
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
      //review why it should be () or nothing, not {}

      .addCase(loadStarterPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //deleted addCase(addPlantByName.fulfilled because it dispatches addPlant, so not needed.

      .addCase(addBasicPlantDetails.fulfilled, (state, action) => {
        persistState(state.plantData, state.detailsEnriched);
      })
      .addCase(enrichPlantDetails.fulfilled, (state, action) => {
        if (!action.payload) return; //not sure if I need this
        const { plantName, API_id, details } = action.payload;
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
