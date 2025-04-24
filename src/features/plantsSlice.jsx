// features/plants/plantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, plantNamesList } from "../constants";
import { PerenualAPISearchEndpoint } from "../constants";

export const addPlantByName = createAsyncThunk(
  "plants/addPlantByName",
  async (plantName, { getState }) => {
    const state = getState();
    if (state.plants.plantData[plantName]) {
      return null;
    }

    const response = await axios.get(
      `https://perenual.com/api/species-list?key=${API_KEY}&q=${plantName}`
    );

    const plant = res.data.data?.[0];
    if (!plant) return null;

    return {
      [plantName]: {
        common_name: plant.common_name,
        scientific_name: plant.scientific_name,
        // id: 1,
        API_id: 5497,
        edible_part: "unknown",
        image: plant.default_image?.small_url || null,
        guideURL: PerenualAPISearchEndpoint + plant.id,
        enriched: false,
      },
    };
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

//This thunk was for mapping over a list of plant names to pull data from the API and create a list of objects to store that plant data in. No longer needed.
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
    //CHECK IF I NEED TO UPDATE THIS ONE TO CONNECT PlantNamesList AND PlantObjectsList
    // addPlantName: (state, action) => {
    //   //if action payload isn't already an array, then make it into one.
    //   const newNames = Array.isArray(action.payload)
    //     ? action.payload
    //     : [action.payload];
    //   const uniqueNames = newNames.filter(
    //     (name) => !state.plantNames.includes(name)
    //   );

    //   state.plantNames = [...state.plantNames, ...uniqueNames];
    // },
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
      // .addCase(fetchPlants.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchPlants.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.plantData = {
      //     ...state.plantData, //details already fetched from Perenual.com API
      //     ...action.payload, //merges new data
      //   };
      // })
      // .addCase(fetchPlants.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
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
