//ChatGPT suggested and led me through this to persist plantData in localStorage without having it run on every dispatch
const persistPlantData = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const actionsToWatch = [
    "plants/addPlantByName/fulfilled",
    "plants/enrichPlantDetails/fulfilled",
    "plants/removePlantName",
  ];
  if (actionsToWatch.includes(action.type)) {
    const { plantData } = storeAPI.getState().plants;
    localStorage.setItem("plantData", JSON.stringify(plantData));
  }
  return result;
};

export default persistPlantData;
