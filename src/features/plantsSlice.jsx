// features/plants/plantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, plantNamesList } from "../constants";

//thunk, which is async action
export const fetchPlants = createAsyncThunk(
  "plants/fetchPlants",
  async (plantNamesList, thunkAPI) => {
    const results = await Promise.all(
      plantNamesList.map(async (plantName, index) => {
        console.log(
          `Fetching: https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
        );
        const res = await axios.get(
          `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
        );
        const plant = res.data.data?.[0];
        if (!plant) return null;

        return {
          [plant.id]: {
            name: plant.common_name || "Unknown",
            id: index + 1,
            API_id: plant.id,
            scientific_name: plant.scientific_name,
            hardiness_zone: plant.hardiness,
            edible: plant.edible,
            duration: plant.cycle || "Unknown",
            sunlight: plant.sunlight || "Unknown",
            watering: plant.watering || "Unknown",
            flowering_season: plant.flowering_season || "Unknown",
            growth_rate: plant.growth_rate || "Unknown",
            care_level: plant.care_level || "Unknown",
            image: plant.default_image?.medium_url || null,
          },
        };
      })
    );
    return Object.assign({}, ...results.filter(Boolean));
  }
);

//second thunk for specific plant details
export const fetchPlantDetailsById = createAsyncThunk(
  "plants/fetchPlantDetailsById",
  async (API_id, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://perenual.com/api/species/details/${API_id}?key=${API_KEY}"
      );
      return;
    } catch (error) {}
  }
);

//create the slice
const plantsSlice = createSlice({
  name: "plants",
  initialState: {
    plantNames: plantNamesList, //user-defined list
    plantData: [],
    selectedPlant: "",
    loading: false,
    error: null,
  },
  reducers: {
    setPlantNames: (state, action) => {
      state.plantNames = action.payload;
    },
    addPlantName: (state, action) => {
      //if action payload isn't already an array, then make it into one.
      const newNames = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const uniqueNames = newNames.filter(
        (name) => !state.plantNames.includes(name)
      );

      state.plantNames = [...state.plantNames, ...uniqueNames];
    },
    removePlantName: (state, action) => {
      state.plantNames = state.plantNames.filter(
        (name) => name !== action.payload
      );
    },
    setSelectedPlant: (state, action) => {
      state.selectedPlant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plantData = {
          ...state.plantData, //details already fetched from Perenual.com API
          ...action.payload, //merges new data
        };
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
