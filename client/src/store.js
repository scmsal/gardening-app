import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./features/plantsSlice";
import hardinessZoneReducer from "./features/zoneSlice";

const store = configureStore({
  reducer: {
    plants: plantReducer,
    hardinessZone: hardinessZoneReducer,
  },
});

export default store;
