import { Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setSelectedPlantName,
  setSelectedPlantData,
} from "../features/plantsSlice";
import {
  getAllFoodPlants,
  listAllNames,
  getFoodPlantByCommonName,
} from "../features/plantsSlice";
import SearchBar from "./SearchBar";

const VeggiesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetNames = async () => {
      try {
        const resultAction = await dispatch(listAllNames());
        console.log("Fetched names:", resultAction);
      } catch (err) {
        console.error("Failed to fetch plant names:", err);
      }
    };
    fetchAndSetNames();
  }, [dispatch]);

  const { plantNames, loading, selectedPlantName, selectedPlantData } =
    useSelector((state) => state.plants);

  console.log("Plant names: ", plantNames);

  useEffect(() => {
    console.log("Updated selectedPlantName:", selectedPlantName);
  }, [selectedPlantName]);

  useEffect(() => {
    console.log("Updated selectedPlantData:", selectedPlantData);
  }, [selectedPlantData]);

  //When a plantName on the list is clicked, the app should fetch the corresponding data (object)
  const handlePlantSelect = (plantName) => {
    console.log("Plant that was clicked:", plantName);

    if (plantName === selectedPlantName) {
      dispatch(setSelectedPlantName(null));
      dispatch(setSelectedPlantData(null));
      return;
    }
    //otherwise set selected plant name in state
    dispatch(setSelectedPlantName(plantName));

    //get data of selected plant name

    //If there is not already a selectedPlantData in the store or it's not for the selected plant, fetch the data. The extra reducer will set it as selectedPlantData
    if (!selectedPlantData || selectedPlantData.common_name !== plantName) {
      dispatch(getFoodPlantByCommonName(plantName));
    }
  };

  if (loading || !plantNames) {
    return (
      <div className="flex flex-col">
        <Spinner />
        <p>Loading plant list... </p>
      </div>
    );
  }

  return (
    <Container className="mx-3 mb-3">
      <SearchBar placeholder="Search for a vegetable or herb" />
      <ListGroup>
        {plantNames?.map((plantName) => (
          <ListGroupItem
            key={plantName || plant.id}
            action
            className="custom-hover"
            variant={
              selectedPlantName === plantName ? "success" : "outline-success"
            }
            onClick={() => {
              handlePlantSelect(plantName);
            }}
          >
            {plantName || "unnamed plant"}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default VeggiesList;
