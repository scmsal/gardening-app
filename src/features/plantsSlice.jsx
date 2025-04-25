// features/plants/plantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../constants";
import { PerenualAPISearchEndpoint } from "../constants";
// import plantObjectsList from "../components/PlantObjectsList";

//later add logic to cache plant data in localStorage and look for it on load without repeating API calls or file fetches

// export const loadStarterPlants = createAsyncThunk(
//   "plants/loadStarterPlants",
//   async (_, thunkAPI) => {
//     console.log("loadStarterPlants thunk is firing");
//     const response = await fetch("/starterplants.json");
//     if (!response.ok) {
//       throw new Error(`Fetch failed with status ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }
// );
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
      image: default_image?.small_url || null,
      guideURL: PerenualAPISearchEndpoint + plant.id,
      enriched: false,
    };
    dispatch(addPlant(newPlant));
    dispatch(enrichPlantDetails({ plantName, API_id: plant.id }));
  }
);

//This thunk is to add info from the details pages of the plants by ID (not available in the species-list endpoint) into the basic info list (i.e. enrich the data)

//for a single plant
export const enrichPlantDetails = createAsyncThunk(
  "plants/enrichPlantDetails",
  async ({ plantName, API_id }) => {
    const response = await axios.get(
      `https://perenual.com/api/species/details/${API_id}?key=${API_KEY}`
    );
    const details = response.data;
    return {
      plantName,
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
  }
);

//for all the plants on the plantData list at once
export const enrichAllPlantDetails = createAsyncThunk(
  "plants/enrichAllPlantDetails",

  async (_, { getState, dispatch }) => {
    const { plantData } = getState().plants;

    for (const plant of plantData) {
      if (plant.API_id && !plant.enriched) {
        await dispatch(
          enrichPlantDetails({
            plantName: plant.common_name.toLowerCase(),
            API_id: plant.API_id,
          })
        );
        await delay(1500);
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
    //obsolete now that plantNames is derived from plantData:
    // setPlantNames: (state, action) => {
    //   state.plantNames = action.payload;
    // },

    // addPlantName: (state, action) => {
    //   //if action payload isn't already an array, then make it into one.
    //   const name = action.payload;
    //   if (!state.plantNames.includes(name)) {
    //     state.plantNames.push(name);
    //   }
    // },

    // removePlantName: (state, action) => {
    //   state.plantNames = state.plantNames.filter(
    //     (name) => name !== action.payload
    //   );
    // },
    //Would only need this if adding plant and data manually through a component
    // addPlantData: (state, action) => {
    //   state.plantData = {
    //     ...state.plantData,
    //     [action.payload.plantName]: action.payload,
    //   };
    // },
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
        state.plantNames = action.payload.map(
          (plant) => plant.general_name.toLowerCase()
          //review why it should be () or nothing, not {}
        );
      })
      .addCase(loadStarterPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPlantByName.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.plantData = {
          ...state.plantData,
          ...action.payload,
        };
      })
      .addCase(enrichPlantDetails.fulfilled, (state, action) => {
        if (!action.payload) return; //not sure if I need this
        const { plantName, details } = action.payload;
        if (state.plantData[plantName]) {
          state.plantData[plantName] = {
            ...state.plantData[plantName],
            ...details,
          };
        }
      });
  },
});
// Export the actions for use in components
export const { setSelectedPlant, addPlant, removePlant } = plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
