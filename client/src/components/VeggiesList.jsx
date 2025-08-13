import { Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSelectedPlant } from "../features/plantsSlice";
import { getAllFoodPlants, listAllNames } from "../features/plantsSlice";
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

  //List of plant names
  const { plantNames, loading } = useSelector((state) => state.plants);

  console.log("Plant names: ", plantNames);

  //Plant selected
  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  const handlePlantSelect = (plantName) => {
    dispatch(setSelectedPlant(plantName === selectedPlant ? null : plantName));
    console.log("Selected plant in handlePlantSelect:", selectedPlant);
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
              selectedPlant === plantName ? "success" : "outline-success"
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
