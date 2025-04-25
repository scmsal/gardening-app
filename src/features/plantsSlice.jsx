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
    const currPlantNames = state.plants.plantNames;

    if (currPlantNames.includes(plantName) && state.plants.plantData[plantName])
      return;

    const response = await axios.get(
      `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
    );

    const plant = response.data.data?.[0];
    if (!plant) return null;

    const newPlant = {
      short_name: plantName,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      // id: 1,
      API_id: 5497,
      edible_part: "unknown",
      image: plant.default_image?.small_url || null,
      guideURL: PerenualAPISearchEndpoint + plant.id,
      enriched: false,
    };
    dispatch(addPlant(newPlant));
    // dispatch(addPlantName(plantName)); //no longer necessary?
  }
);

//This thunk is to add info from the details pages of the plants by ID (not available in the species-list endpoint) into the basic info list (i.e. enrich the data)

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
        duration: details.cycle,
        edible: details.edible,
        enriched: true,
        flowering_season: details.flowering_season,
        flowers: details.flowers,
        growth_rate: details.growth_rate,
        hardiness_zone: details.hardiness,
        harvest_season: details.harvest_season,
        drought_tolerant: details.drought_tolerant,
        sunlight: details.sunlight,
        type: details.type,
        watering: details.watering,
      },
    };
  }
);

//This thunk was for mapping over a list of plant names to pull data from the API and create a list of objects to store that plant data in. No longer needed right now as I created a JSON file starterPlants.json, but I'll save it for future use.
// export const fetchPlants = createAsyncThunk(
//   "plants/fetchPlants",
//   async (plantNamesList, thunkAPI) => {
//     const results = await Promise.all(
//       plantNamesList.map(async (plantName, index) => {
//         console.log(
//           `Fetching: https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
//         );
//         const res = await axios.get(
//           `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
//         );
//         const plant = res.data.data?.[0];
//         if (!plant) return null;

//         return {
//           [plant.id]: {
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
//         };
//       })
//     );
//     return Object.assign({}, ...results.filter(Boolean));
//   }
// );

//create the slice
const plantsSlice = createSlice({
  name: "plants",
  initialState: {
    plantData: [], //used to be plantObjectsList.
    plantNames: [],
    // plantObjectsList.map((plant) =>
    //   plant.common_name.toLowerCase()
    // ),
    selectedPlant: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPlantNames: (state, action) => {
      state.plantNames = action.payload;
    },

    addPlantName: (state, action) => {
      //if action payload isn't already an array, then make it into one.
      const name = action.payload;
      if (!state.plantNames.includes(name)) {
        state.plantNames.push(name);
      }
    },

    removePlantName: (state, action) => {
      state.plantNames = state.plantNames.filter(
        (name) => name !== action.payload
      );
    },
    //Would only need this if adding plant and data manually through a component
    // addPlantData: (state, action) => {
    //   state.plantData = {
    //     ...state.plantData,
    //     [action.payload.plantName]: action.payload,
    //   };
    // },
    setSelectedPlant: (state, action) => {
      state.selectedPlant = action.payload;
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
export const {
  setPlantNames,
  addPlantName,
  removePlantName,
  setSelectedPlant,
} = plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
