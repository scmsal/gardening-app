import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./features/plantsSlice";
import persistPlantData from "./middleware/persistPlantData";
import { loadState } from "../utils/localStorageHelpers";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    plants: plantReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(persistPlantData),
  preloadedState,
});

export default store;
