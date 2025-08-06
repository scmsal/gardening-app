//suggestion by ChatGPT to hydrate store and localStorage

export const savePlantData = (plantData) => {
  try {
    const serializedData = JSON.stringify(plantData);
    localStorage.setItem("plantData", serializedData);
  } catch (error) {
    console.error("Failed to save plantData:", error);
  }
};

export const saveDetailsEnriched = (detailsEnriched) => {
  try {
    const serializedData = JSON.stringify(detailsEnriched);
    localStorage.setItem("detailsEnriched", serializedData);
  } catch (error) {
    console.error("Failed to save detailsEnriched:", error);
  }
};

export const loadState = () => {
  try {
    const serializedPlantData = localStorage.getItem("plantData");
    const serializedDetailsEnriched = localStorage.getItem("detailsEnriched");

    const plantData = serializedPlantData
      ? JSON.parse(serializedPlantData)
      : [];
    const detailsEnriched = serializedDetailsEnriched
      ? JSON.parse(serializedDetailsEnriched)
      : false;
    return {
      plants: {
        plantData,
        detailsEnriched,
        selectedPlant: null,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.log(error)("Failed to load state from localStorage", error);
    return undefined;
  }
};
