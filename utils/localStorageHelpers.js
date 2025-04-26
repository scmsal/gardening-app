//another suggestion by ChatGPT to hydrate store and localStorage

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
    const plantData = JSON.parse(localStorage.getItem("plantData") || []);
    const detailsEnriched = JSON.parse(
      localStorage.getItem("detailsEnriched") || false
    );

    return {
      plants: plantData,
      detailsEnriched,
      selectedPlant: null,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.log(error)("Failed to load state from localStorage", err);
    return undefined;
  }
};

export { loadState, saveDetailsEnriched, savePlantData };
