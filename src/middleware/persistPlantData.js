//ChatGPT suggested and led me through this to persist plantData in localStorage without having it run on every dispatch
const persistPlantData = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const actionsToWatch = [
    "plants/addPlantByName/fulfilled",
    "plants/enrichPlantDetails/fulfilled",
    "plants/enrichAllPlantDetails/fulfilled",
    "plants/addPlant",
    "plants/removePlant",
    "plants/setDetailsEnriched",
  ];
  if (actionsToWatch.includes(action.type)) {
    const { plantData } = storeAPI.getState().plants;
    localStorage.setItem("plantData", JSON.stringify(plantData));
    localStorage.setItem("detailsEnriched", JSON.stringify(detailsEnriched));
  }
  return result;
};

export default persistPlantData;
