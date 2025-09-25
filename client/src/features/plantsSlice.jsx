//==IMPORTS==
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

//==ASYNC THUNKS==

export const getAllFoodPlants = createAsyncThunk(
  "plants/getAllFoodPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL_ENDPOINT + "/api/allFoodPlants"
      );
      return response.data;
    } catch (error) {
      //If there is an error in the backend
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      //If there is a network or unexpected error
      return rejectWithValue(error.message);
    }
  }
);

//==SELECTORS==

export const selectPlantByName = (state, plantName) => {
  return state.plants.allPlantData.find(
    (plant) => plant.common_name === plantName
  );
};

//==INITIAL STATE==
const initialState = {
  allPlantData: [],
  loading: false,
  error: null,
};

//==DEFINE THE SLICE==
const plantsSlice = createSlice({
  name: "plants",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getAllFoodPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFoodPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlantData = action.payload;
        state.error = null;
      })

      .addCase(getAllFoodPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default plantsSlice.reducer;
