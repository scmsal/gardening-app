import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../config";
import { PerenualAPISearchEndpoint } from "../config";
import placeholderImg from "../assets/icons8-plant-80.png";
import delay from "../../utils/delay";
// Async thunk to load starter plants from a local JSON file

export const loadStarterPlants = createAsyncThunk(
  "plants/loadStarterPlants",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/starterPlants.json");
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.statusText}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  plantData: null, //will be an array of plant objects
  selectedPlant: null,
  loading: false,
  error: null,
};

//create the slice
const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
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
        state.error = null;
      })

      .addCase(loadStarterPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// Export the actions for use in components
export const {
  setSelectedPlant,
  addPlant,
  removePlant,
  setDetailsEnriched,
  incrementAPICallCount,
} = plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
