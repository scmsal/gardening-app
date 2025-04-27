import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPDAPI_KEY } from "../config";

const HARDINESS_API_URL =
  "https://plant-hardiness-zone.p.rapidapi.com/zipcodes";

export const fetchHardinessZone = createAsyncThunk(
  "hardinessZone/fetchZone",
  async (zipCode, thunkAPI) => {
    // if (!API_CALLS_ENABLED) {
    //   console.warn("API calls are currently disabled.");
    //   return thunkAPI.rejectWithValue("API calls disabled manually.");
    // }

    //zip comes from user input
    try {
      const options = {
        method: "GET",
        url: `${HARDINESS_API_URL}/${zip}`,
        headers: {
          "x-rapidapi-key": RAPDAPI_KEY,
          "x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      console.log(response.data.hardiness_zone);
      return response.data.zone;
    } catch (error) {
      console.error(error);
      // return thunkAPI.rejectWithValue(error.message); //check as it might just stop the whole app.
    }
  }
);

const hardinessZoneSlice = createSlice({
  name: hardinessZone,
  initialState: {
    zipCode: "",
    zone: null,
    loading: false,
    error: null,
  },
  reducers: {
    setZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
  },
  extrareducers: (builder) => {
    builder
      .addCase(fetchHardinessZone.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchHardinessZone.fulfilled, (state) => {
        state.loading = false;
        state.zone = action.payload;
      })
      .addCase(fetchHardinessZone.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setZipCode } = hardinessZoneSlice.actions;
export default hardinessZoneSlice.reducer;
