//==IMPORTS==
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

//==ASYNC THUNKS==

export const getAllFoodPlants = createAsyncThunk(
  "plants/getAllFoodPlants",
  async (_, { rejectWithValue }) => {
    console.log("backend:", BACKEND_URL_ENDPOINT);
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
  // console.log(
  //   "Test in selectPlantByName definition",
  //   state.plants.allPlantData.find((plant) => plant.common_name === "Basil")
  // );
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
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder

      //for getAllFoodPlants
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
    // //for listAllNames
    // .addCase(listAllNames.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(listAllNames.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.plantNames = action.payload;
    //   state.error = null;
    // })

    // .addCase(listAllNames.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload || action.error.message;
    // })
    //for getFoodPlantByCommonName
    // .addCase(getFoodPlantByCommonName.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getFoodPlantByCommonName.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.selectedPlantData = action.payload;
    //   state.error = null;
    // })
    // .addCase(getFoodPlantByCommonName.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});
// Export the action(s) for use in components
// export const { setSelectedPlantName, setSelectedPlantData, setPlantNames } =
//   plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
