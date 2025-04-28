//Credit: https://rapidapi.com/fireside-worldwide-fireside-worldwide-default/api/plant-hardiness-zone

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPDAPI_KEY } from "../config";

const HARDINESS_API_URL =
  "https://plant-hardiness-zone.p.rapidapi.com/zipcodes";

export const fetchHardinessZone = createAsyncThunk(
  "hardinessZone/fetchHardinessZone",
  async (zip, thunkAPI) => {
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
      console.log(response.data.hardiness_zone); //update?
      return response.data.zone; //double check shape of actual response data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message); //check as it might just stop the whole app.
    }
  }
);

const hardinessZoneSlice = createSlice({
  name: "hardinessZone",
  initialState: {
    zone: null,
    loading: false,
    error: null,
  },
  reducers: {
    extrareducers: (builder) => {
      builder
        .addCase(fetchHardinessZone.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.zone = null; //clears the zone during new search
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
  },
});

export default hardinessZoneSlice.reducer;

//eventually integrate data from here: https://github.com/waldoj/frostline to a) get temperatures for each zone and b) generate maps.

//otherwise, link to https://planthardiness.ars.usda.gov/ that shows all that info searchable by zip code.
