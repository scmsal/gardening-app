//==IMPORTS==
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

//==ASYNC THUNKS==
// Async thunk to load starter plants from a local JSON file

export const loadStarterPlants = createAsyncThunk(
  "plants/loadStarterPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/starterPlants.json");
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

export const getAllFoodPlants = createAsyncThunk(
  "plants/getAllFoodPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL_ENDPOINT + "/getAllFoodPlants"
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

export const listAllNames = createAsyncThunk(
  "plants/listAllNames",
  async (_, { rejectWithValue }) => {
    try {
      console.log("listAllNames fired.");
      const response = await axios.get(BACKEND_URL_ENDPOINT + "/listAllNames");

      console.log(response.data);
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

export const getFoodPlantByCommonName = createAsyncThunk(
  "plants/getFoodPlantByCommonName",
  async (commonName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL_ENDPOINT + "/getFoodPlantByCommonName",
        {
          params: { common_name: commonName },
        }
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

//==INITIAL STATE==
const initialState = {
  plantNames: [], //will be an array of strings
  selectedPlantName: null, //will be a string
  selectedPlantData: null, //will be an object
  loading: false,
  error: null,
};

//==DEFINE THE SLICE==
const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    setSelectedPlantName: (state, action) => {
      state.selectedPlantName = action.payload;
    },
    setSelectedPlantData: (state, action) => {
      state.selectedPlantData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //for loadStarterPlants
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
      })
      //for loadAllFoodPlants
      .addCase(getAllFoodPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFoodPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plantData = action.payload; //EDIT
        state.error = null;
      })

      .addCase(getAllFoodPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //for listAllNames
      .addCase(listAllNames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listAllNames.fulfilled, (state, action) => {
        state.loading = false;
        state.plantNames = action.payload;
        state.error = null;
      })

      .addCase(listAllNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //for getFoodPlantByCommonName
      .addCase(getFoodPlantByCommonName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodPlantByCommonName.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlantData = action.payload;
        state.error = null;
      })

      .addCase(getFoodPlantByCommonName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// Export the action(s) for use in components
export const { setSelectedPlantName, setSelectedPlantData, setPlantNames } =
  plantsSlice.actions;

// Export the reducer to use in configureStore()
export default plantsSlice.reducer;
