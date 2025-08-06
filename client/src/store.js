import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./features/plantsSlice";
import hardinessZoneReducer from "./features/zoneSlice";
import { loadState } from "../utils/localStorageHelpers";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    plants: plantReducer,
    hardinessZone: hardinessZoneReducer,
  },

  preloadedState,
});

export default store;
