import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPlantByName } from "../features/plantsSlice";

export const useSelectedPlant = () => {
  const { plantName } = useParams();

  const selectedPlant = useSelector((state) =>
    selectPlantByName(state, plantName)
  );

  return selectedPlant;
};
