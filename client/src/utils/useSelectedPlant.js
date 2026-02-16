//custom hook to get the selected plant from the store based on the plant name in the url params

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPlantByName } from "../features/plantsSlice";

export const useSelectedPlant = () => {
  const { plantName } = useParams();

  const selectedPlant = useSelector((state) =>
    selectPlantByName(state, plantName),
  );

  return selectedPlant;
};
