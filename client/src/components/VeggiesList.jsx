import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlant } from "../features/plantsSlice";

const VeggiesList = () => {
  const dispatch = useDispatch();

  const selectedPlant = useSelector((state) => state.plants.selectedPlant);
  const plantData = useSelector((state) => state.plants.plantData);

  const handlePlantSelect = (plant) => {
    dispatch(setSelectedPlant(plant === selectedPlant ? null : plant));
    console.log("Selected plant in handlePlantSelect:", selectedPlant);
  };

  if (!plantData || plantData.length === 0) {
    return <div> Loading plant data...</div>;
  } //maybe add spinner

  return (
    <Container className="mx-3 mb-3">
      <ListGroup>
        {plantData.map((plant) => (
          <ListGroupItem
            key={plant.API_id || plant.id}
            action
            className="custom-hover"
            variant={selectedPlant === plant ? "success" : "outline-success"}
            onClick={() => {
              dispatch(handlePlantSelect(plant));
            }}
          >
            {plant.general_name || plant.common_name || "unnamed plant"}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default VeggiesList;
